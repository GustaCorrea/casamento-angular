import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guest } from '../../../../shared/constants/Guest';
import { GuestService } from '../../services/guest/guest-service';

@Component({
  selector: 'admin-guest-page',
  standalone: false,
  templateUrl: './guest-page.html'
})
export class GuestPage implements OnInit {
  // Listas e Filtros
  convidados: Guest[] = [];
  searchQuery: string = '';
  filterStatus: 'Todos' | 'Confirmado' | 'Aguardando' = 'Todos';

  // Métricas do Painel
  totalConvidados: number = 0;
  confirmados: number = 0;
  aguardando: number = 0;

  // Modais e Estados de Edição
  showModal: boolean = false;
  isEditing: boolean = false;
  selectedGuest: Guest | null = null;
  guestContactType: 'tel' | 'email' = 'tel';

  // Formulário Reativo
  guestForm!: FormGroup;

  constructor(
    private guestService: GuestService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.initForms();
  }

  ngOnInit(): void {
    this.loadGuests();
  }

  // Contato agora é opcional (sem Validators.required)
  private initForms(): void {
    this.guestForm = this.fb.group({
      nome: ['', Validators.required],
      contato: [''] 
    });
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe({
      next: (data) => {
        this.convidados = data;
        this.calculateMetrics();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar convidados:', err)
    });
  }

  private calculateMetrics(): void {
    this.totalConvidados = this.convidados.length;
    this.confirmados = this.convidados.filter(g => g.status === 'Confirmado').length;
    this.aguardando = this.convidados.filter(g => g.status === 'Aguardando').length;
  }

  openModal(guest?: Guest): void {
    this.isEditing = !!guest;
    this.selectedGuest = guest || null;
    this.showModal = true;

    if (guest) {
      if (guest.email) {
        this.guestContactType = 'email';
        this.guestForm.patchValue({ nome: guest.nome, contato: guest.email });
      } else {
        this.guestContactType = 'tel';
        this.guestForm.patchValue({ nome: guest.nome, contato: guest.telefone || '' });
      }
    } else {
      this.guestForm.reset();
      this.guestContactType = 'tel';
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedGuest = null;
    this.guestForm.reset();
  }

  setGuestContactType(type: 'tel' | 'email'): void {
    this.guestContactType = type;
  }

  saveGuest(): void {
    if (this.guestForm.invalid) return;

    const formValue = this.guestForm.value;
    const contatoDigitado = formValue.contato ? formValue.contato.trim() : '';
    const isEmail = this.guestContactType === 'email';

    const guestData: any = {
      nome: formValue.nome,
      email: isEmail ? contatoDigitado : null,
      telefone: !isEmail ? contatoDigitado : null,
      status: this.isEditing && this.selectedGuest ? this.selectedGuest.status : 'Aguardando'
    };

    if (this.isEditing && this.selectedGuest?.id) {
      this.guestService.updateGuest(this.selectedGuest.id, guestData).subscribe({
        next: () => { this.loadGuests(); this.closeModal(); this.cdr.detectChanges(); },
        error: (err) => console.error('Erro ao atualizar:', err)
      });
    } else {
      this.guestService.addGuest(guestData).subscribe({
        next: () => { this.loadGuests(); this.closeModal(); this.cdr.detectChanges(); },
        error: (err) => console.error('Erro ao cadastrar:', err)
      });
    }
  }
  
  deleteGuest(id: number): void {
    if (confirm('Tem certeza que deseja excluir este convidado?')) {
      this.guestService.deleteGuest(id).subscribe({
        next: () => { this.loadGuests(); this.cdr.detectChanges(); },
        error: (err) => console.error('Erro ao excluir convidado:', err)
      });
    }
  }
}