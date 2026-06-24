import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private admGuestsService: AdmGuestsService) {
    this.guestForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      restricoes: [''],
      limiteAcompanhantes: [0, [Validators.required, Validators.min(0)]],
      status: ['Aguardando', Validators.required]
    });
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
      this.guestForm.patchValue(convidado);
    } else {
      this.isEditing = false;
      this.editingId = null;
      this.guestForm.reset({ limiteAcompanhantes: 0, status: 'Aguardando' });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.guestForm.reset();
  }

  saveGuest() {
    if (this.guestForm.invalid) return;

    const guestData = this.guestForm.value;

    if (this.isEditing && this.editingId) {
      this.convidados = this.convidados.map(c => c.id === this.editingId ? { ...guestData, id: this.editingId } : c);
      Swal.fire('Atualizado!', 'O convidado foi atualizado com sucesso.', 'success');
    } else {
      const newGuest = { ...guestData, id: Date.now() };
      this.convidados = [...this.convidados, newGuest];
      Swal.fire('Cadastrado!', 'O convidado foi adicionado à lista.', 'success');
    }

    this.closeModal();
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