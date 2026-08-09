import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GiftService } from '../../services/gift/gift-service';
import { Gift } from '../../../../shared/constants/Gift';

@Component({
  selector: 'admin-gift-page',
  standalone: false,
  templateUrl: './gift-page.html',
})
export class GiftPage implements OnInit {
  allGifts: Gift[] = [];
  gifts: Gift[] = [];

  searchTerm: string = '';
  activeCategory: string = 'Todos';

  isFormOpen: boolean = false;
  newGift: Partial<Gift> = {};

  editingId: number | undefined = undefined;
  editedGift: Partial<Gift> = {};

  // Guarda o arquivo físico para enviar ao Java
  selectedFile: File | null = null; 
  
  // Guarda apenas o visual para o HTML (preview)
  imagePreview: string | null = null; 

  constructor(private giftService: GiftService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadGifts();
  }

  loadGifts(): void {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.allGifts = data;
        this.applyFilterAndSearch();
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao buscar presentes:', err),
    });
  }

  applyFilterAndSearch(): void {
    this.gifts = this.allGifts.filter((gift) => {
      const matchCategory =
        this.activeCategory === 'Todos' ||
        gift.type?.toUpperCase() === this.activeCategory.toUpperCase();

      const giftName = gift.name?.toLowerCase() || '';
      const giftDesc = gift.description?.toLowerCase() || '';

      const matchSearch =
        giftName.includes(this.searchTerm.toLowerCase()) ||
        giftDesc.includes(this.searchTerm.toLowerCase());

      return matchCategory && matchSearch;
    });
  }

  searchGift(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilterAndSearch();
  }

  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.applyFilterAndSearch();
  }

  toggleForm(): void {
    this.isFormOpen = !this.isFormOpen;
    if (this.isFormOpen) {
      this.newGift = { type: 'Casa' };
    } else {
      this.newGift = {};
    }
    
    // IMPORTANTE: Limpar a seleção de arquivo ao abrir/fechar o form
    this.imagePreview = null;
    this.selectedFile = null; 
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile = file; // Salva o arquivo real para o FormData

      // O FileReader continua aqui apenas para mostrar a foto na tela (preview)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveGift(): void {
    if (!this.newGift.name || !this.newGift.value) {
      alert('Por favor, preencha o nome e o valor.');
      return;
    }

    // 1. Criando o FormData ao invés de um objeto JSON
    const formData = new FormData();
    formData.append('name', this.newGift.name);
    formData.append('type', this.newGift.type?.toUpperCase() || 'CASA');
    formData.append('value', this.newGift.value.toString());
    formData.append('description', this.newGift.description || '');

    // 2. Anexando o arquivo físico se ele existir
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 3. Enviando o FormData para o Service
    this.giftService.addGift(formData as any).subscribe({
      next: (savedGift: Gift) => {
        this.allGifts.push(savedGift);
        this.applyFilterAndSearch();
        this.toggleForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar o presente.');
      },
    });
  }

  startEditing(gift: Gift): void {
    this.editingId = gift.id;
    this.editedGift = { ...gift };
    this.imagePreview = gift.imageUrl ? 'http://localhost:8080' + gift.imageUrl : null; 
    
    this.selectedFile = null; 
  }

  cancelEdit(): void {
    this.editingId = undefined;
    this.editedGift = {};
    this.imagePreview = null;
    this.selectedFile = null; // Limpa o cache do arquivo
  }

  saveEdit(): void {
    if (!this.editingId || !this.editedGift.name || !this.editedGift.value) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    // 1. Criando o FormData para a edição
    const formData = new FormData();
    formData.append('name', this.editedGift.name);
    formData.append('type', this.editedGift.type?.toUpperCase() || 'CASA');
    formData.append('value', this.editedGift.value.toString());
    formData.append('description', this.editedGift.description || '');

    // 2. Anexando arquivo SOMENTE se o usuário escolheu uma nova foto
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // 3. Enviando para o Service
    this.giftService.updateGift(this.editingId, formData as any).subscribe({
      next: (updatedGift: Gift) => {
        const index = this.allGifts.findIndex((g) => g.id === this.editingId);
        if (index !== -1) {
          this.allGifts[index] = updatedGift;
        }
        this.applyFilterAndSearch();
        this.cancelEdit();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar o presente.');
      },
    });
  }

  deleteEvent(gift: Gift): void {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o presente "${gift.name}"?`);
    if (confirmDelete && gift.id) {
      this.giftService.deleteGift(gift.id).subscribe({
        next: () => {
          this.allGifts = this.allGifts.filter((g) => g.id !== gift.id);
          this.applyFilterAndSearch();
          this.cdr.detectChanges();
        },
        error: (err) => alert('Erro ao deletar o presente.'),
      });
    }
  }
}