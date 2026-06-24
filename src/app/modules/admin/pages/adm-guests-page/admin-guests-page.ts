import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdmGuestsService, Convidado } from '../../services/admin-guests-service';
import { FilterAdmGuestsPipe } from '../../pipes/filter-adm-guests-pipe';

@Component({
  selector: 'app-adm-guests',
  standalone: false,
  templateUrl: './admin-guests-page.html'
})
export class AdmGuestsComponent implements OnInit {
  convidados: Convidado[] = [];
  searchQuery = '';
  filterStatus = 'Todos';

  showModal = false;
  isEditing = false;
  guestForm: FormGroup;
  editingId: number | null = null;

  showCompanionModal = false;
  isEditingCompanion = false;
  editingCompanionIndex: number | null = null;
  activeGuestForCompanion: Convidado | null = null;
  companionForm: FormGroup;

  guestContactType: 'tel' | 'email' = 'tel';
  companionContactType: 'tel' | 'email' = 'tel';

  constructor(private fb: FormBuilder, private admGuestsService: AdmGuestsService) {
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

  setGuestContactType(type: 'tel' | 'email', reset = true) {
    this.guestContactType = type;
    const control = this.guestForm.get('contato');
    if (type === 'email') {
      control?.setValidators([Validators.required, Validators.email]);
    } else {
      control?.setValidators([Validators.required]);
    }
    control?.updateValueAndValidity();
    if (reset) control?.setValue('');
  }

  setCompanionContactType(type: 'tel' | 'email', reset = true) {
    this.companionContactType = type;
    const control = this.companionForm.get('contato');
    if (type === 'email') {
      control?.setValidators([Validators.required, Validators.email]);
    } else {
      control?.setValidators([Validators.required]);
    }
    control?.updateValueAndValidity();
    if (reset) control?.setValue('');
  }

  ngOnInit() {
    this.loadConvidados();
  }

  loadConvidados() {
    this.convidados = [
      { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '1199999999', restricoes: 'Nenhuma', limiteAcompanhantes: 2, status: 'Confirmado' },
      { id: 2, nome: 'Maria Souza', email: 'maria@email.com', telefone: '1188888888', restricoes: 'Vegetariana', limiteAcompanhantes: 1, status: 'Aguardando' }
    ];
  }

  openModal(convidado?: Convidado) {
    if (convidado) {
      this.isEditing = true;
      this.editingId = convidado.id!;
      const contactType = convidado.email ? 'email' : 'tel';
      this.setGuestContactType(contactType, false);
      this.guestForm.patchValue({
         nome: convidado.nome,
         contato: convidado.email || convidado.telefone || '',
         limiteAcompanhantes: convidado.limiteAcompanhantes
      });
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.setGuestContactType('tel', false);
      this.guestForm.reset({ limiteAcompanhantes: 0 });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.guestForm.reset();
  }

  saveGuest() {
    if (this.guestForm.invalid) return;

    const formVal = this.guestForm.value;
    const guestData: any = {
       nome: formVal.nome,
       limiteAcompanhantes: formVal.limiteAcompanhantes
    };
    if (this.guestContactType === 'email') {
       guestData.email = formVal.contato;
       guestData.telefone = '';
    } else {
       guestData.telefone = formVal.contato;
       guestData.email = '';
    }

    if (this.isEditing && this.editingId) {
      this.convidados = this.convidados.map(c => c.id === this.editingId ? { ...c, ...guestData } : c);
      Swal.fire('Atualizado!', 'O convidado foi atualizado com sucesso.', 'success');
    } else {
      const newGuest: Convidado = { 
        ...guestData, 
        id: Date.now(),
        status: 'Aguardando',
        restricoes: '',
        acompanhantes: []
      };
      this.convidados = [...this.convidados, newGuest];
      Swal.fire('Cadastrado!', 'O convidado foi adicionado à lista.', 'success');
    }

    this.closeModal();
  }

  openCompanionModal(guest: Convidado, compIndex?: number) {
    this.activeGuestForCompanion = guest;
    if (compIndex !== undefined) {
      this.isEditingCompanion = true;
      this.editingCompanionIndex = compIndex;
      const comp = guest.acompanhantes![compIndex];
      const contactType = comp.email ? 'email' : 'tel';
      this.setCompanionContactType(contactType, false);
      this.companionForm.patchValue({ 
        nome: comp.nome,
        contato: comp.email || comp.telefone || ''
      });
    } else {
      this.isEditingCompanion = false;
      this.editingCompanionIndex = null;
      this.setCompanionContactType('tel', false);
      this.companionForm.reset();
    }
    this.showCompanionModal = true;
  }

  closeCompanionModal() {
    this.showCompanionModal = false;
    this.activeGuestForCompanion = null;
    this.editingCompanionIndex = null;
    this.companionForm.reset();
  }

  saveCompanion() {
    if (this.companionForm.invalid || !this.activeGuestForCompanion) return;
    
    const formVal = this.companionForm.value;
    const companionData: any = { nome: formVal.nome };
    
    if (this.companionContactType === 'email') {
       companionData.email = formVal.contato;
       companionData.telefone = '';
    } else {
       companionData.telefone = formVal.contato;
       companionData.email = '';
    }

    const guest = this.activeGuestForCompanion;
    
    if (!guest.acompanhantes) guest.acompanhantes = [];
    
    if (this.isEditingCompanion && this.editingCompanionIndex !== null) {
      guest.acompanhantes[this.editingCompanionIndex] = { ...guest.acompanhantes[this.editingCompanionIndex], ...companionData };
      Swal.fire('Atualizado!', 'O acompanhante foi atualizado com sucesso.', 'success');
    } else {
      if (guest.acompanhantes.length >= guest.limiteAcompanhantes) {
        Swal.fire('Atenção', 'Limite de acompanhantes atingido para este convidado.', 'warning');
        return;
      }
      guest.acompanhantes.push(companionData);
      Swal.fire('Sucesso!', 'Acompanhante adicionado com sucesso.', 'success');
    }
    this.closeCompanionModal();
  }

  deleteCompanion(guest: Convidado, compIndex: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'O acompanhante será excluído.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#8b5e52',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        guest.acompanhantes!.splice(compIndex, 1);
        Swal.fire('Excluído!', 'O acompanhante foi removido.', 'success');
      }
    });
  }

  deleteGuest(id: number) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Isso também excluirá os acompanhantes vinculados a ele.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#c0392b',
      cancelButtonColor: '#8b5e52',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.convidados = this.convidados.filter(c => c.id !== id);
        Swal.fire('Excluído!', 'O convidado foi removido.', 'success');
      }
    });
  }

  get totalConvidados() { return this.convidados.length; }
  get confirmados() { return this.convidados.filter(c => c.status === 'Confirmado').length; }
  get aguardando() { return this.convidados.filter(c => c.status === 'Aguardando').length; }
}