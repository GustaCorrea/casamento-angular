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

  showCompanionModal: boolean = false;
  isEditingCompanion: boolean = false;
  selectedCompanionIndex: number | null = null;
  companionContactType: 'tel' | 'email' = 'tel';

  // Formulários Reativos
  guestForm!: FormGroup;
  companionForm!: FormGroup;

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

  // --- Inicialização de Formulários ---
  private initForms(): void {
    this.guestForm = this.fb.group({
      nome: ['', Validators.required],
      contato: ['', Validators.required],
      limiteAcompanhantes: [0, [Validators.required, Validators.min(0)]]
    });

    this.companionForm = this.fb.group({
      nome: ['', Validators.required],
      contato: ['', Validators.required]
    });
  }

  // --- API / Carregamento de Dados ---
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

  // --- Gerenciamento do Convidado Principal ---
  openModal(guest?: Guest): void {
    this.isEditing = !!guest;
    this.selectedGuest = guest || null;
    this.showModal = true;

    if (guest) {
      // Identifica se o contato salvo se comporta mais como e-mail ou telefone
      const contatoSalvo = guest.email || guest.telefone || '';
      this.guestContactType = contatoSalvo.includes('@') ? 'email' : 'tel';

      this.guestForm.patchValue({
        nome: guest.nome,
        contato: contatoSalvo,
        limiteAcompanhantes: guest.limiteAcompanhantes || 0
      });
    } else {
      this.guestForm.reset({ limiteAcompanhantes: 0 });
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

    // Monta o objeto separando email/telefone dinamicamente com base na escolha do botão
    // Adicionado o campo 'restricoes' por padrão para blindar o payload enviado à tradução do Service
    const guestData: Partial<Guest> = {
      nome: formValue.nome,
      limiteAcompanhantes: formValue.limiteAcompanhantes,
      email: this.guestContactType === 'email' ? formValue.contato : '',
      telefone: this.guestContactType === 'tel' ? formValue.contato : '',
      restricoes: this.isEditing && this.selectedGuest ? this.selectedGuest.restricoes : '',
      status: this.isEditing && this.selectedGuest ? this.selectedGuest.status : 'Aguardando',
      acompanhantes: this.isEditing && this.selectedGuest ? this.selectedGuest.acompanhantes : []
    };

    if (this.isEditing && this.selectedGuest?.id) {
      this.guestService.updateGuest(this.selectedGuest.id, { ...this.selectedGuest, ...guestData } as Guest)
        .subscribe({
          next: () => {
            this.loadGuests();
            this.closeModal();
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Erro ao atualizar convidado:', err)
        });
    } else {
      this.guestService.addGuest(guestData as Guest).subscribe({
        next: () => {
          this.loadGuests();
          this.closeModal();
        },
        error: (err) => console.error('Erro ao cadastrar convidado:', err)
      });
    }
  }

  deleteGuest(id: number): void {
    if (confirm('Tem certeza que deseja excluir este convidado?')) {
      this.guestService.deleteGuest(id).subscribe({
        next: () => {this.loadGuests(),this.cdr.detectChanges();},
        error: (err) => console.error('Erro ao excluir convidado:', err)
      });
    }
  }

  // --- Gerenciamento de Acompanhantes ---
  openCompanionModal(guest: Guest, index?: number): void {
    this.selectedGuest = guest;
    this.isEditingCompanion = index !== undefined;
    this.selectedCompanionIndex = index !== undefined ? index : null;
    this.showCompanionModal = true;

    if (this.isEditingCompanion && index !== undefined && guest.acompanhantes) {
      const comp = guest.acompanhantes[index];
      const contatoSalvo = comp.email || comp.telefone || '';
      this.companionContactType = contatoSalvo.includes('@') ? 'email' : 'tel';

      this.companionForm.patchValue({
        nome: comp.nome,
        contato: contatoSalvo
      });
    } else {
      this.companionForm.reset();
      this.companionContactType = 'tel';
    }
  }

  closeCompanionModal(): void {
    this.showCompanionModal = false;
    this.selectedCompanionIndex = null;
    this.companionForm.reset();
  }

  setCompanionContactType(type: 'tel' | 'email'): void {
    this.companionContactType = type;
  }

  saveCompanion(): void {
    if (this.companionForm.invalid || !this.selectedGuest) return;

    const formValue = this.companionForm.value;
    const newCompanion = {
      nome: formValue.nome,
      email: this.companionContactType === 'email' ? formValue.contato : '',
      telefone: this.companionContactType === 'tel' ? formValue.contato : ''
    };

    if (!this.selectedGuest.acompanhantes) {
      this.selectedGuest.acompanhantes = [];
    }

    if (this.isEditingCompanion && this.selectedCompanionIndex !== null) {
      this.selectedGuest.acompanhantes[this.selectedCompanionIndex] = newCompanion;
    } else {
      // Verifica limite antes de adicionar
      const limite = this.selectedGuest.limiteAcompanhantes ?? 0;
      if (this.selectedGuest.acompanhantes.length >= limite) {
        alert(`Este convidado atingiu o limite de ${limite} acompanhantes.`);
        return;
      }
      this.selectedGuest.acompanhantes.push(newCompanion);
    }

    // Salva o estado atualizado do convidado no backend
    this.guestService.updateGuest(this.selectedGuest.id!, this.selectedGuest).subscribe({
      next: () => {
        this.loadGuests();
        this.closeCompanionModal();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao atualizar acompanhantes:', err)
    });
  }

  deleteCompanion(guest: Guest, index: number): void {
    if (confirm('Deseja realmente remover este acompanhante?') && guest.acompanhantes) {
      guest.acompanhantes.splice(index, 1);
      this.guestService.updateGuest(guest.id!, guest).subscribe({
        next: () => {this.loadGuests(),this.cdr.detectChanges();},
        error: (err) => console.error('Erro ao remover acompanhante:', err)
      });
    }
  }
}
