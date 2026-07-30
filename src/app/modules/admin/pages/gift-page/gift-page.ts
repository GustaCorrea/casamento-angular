import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GiftService } from '../../services/gift/gift-service'; // ajuste o caminho se necessário
import { Gift } from '../../../../shared/constants/Gift';

@Component({
  selector: 'admin-gift-page',
  standalone: false,
  templateUrl: './gift-page.html',
})
export class GiftPage implements OnInit {
  allGifts: Gift[] = [];
  gifts: Gift[] = []; // Lista exibida na tabela (filtrada/buscada)

  searchTerm: string = '';
  activeCategory: string = 'Todos';

  // Controle do Formulário Inline (Criação)
  isFormOpen: boolean = false;
  newGift: Partial<Gift> = {};

  // Controle de Edição
  editingId: number | undefined = undefined;
  editedGift: Partial<Gift> = {};

  selectedFile: File | null = null;
 imagePreview: string | null = null;

  constructor(private giftService: GiftService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadGifts();
  }

  // GET: Carrega os presentes da API
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

  // Filtros combinados de Categoria e Termo de Busca
  applyFilterAndSearch(): void {
    this.gifts = this.allGifts.filter((gift) => {
      // Compara transformando ambos para UPPERCASE para ignorar se veio 'CASA' ou 'Casa'
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
      this.newGift = { type: 'Casa' }; // Mantém 'Casa' idêntico ao <option value="Casa">
    } else {
      this.newGift = {};
    }
  }

  // POST: Cadastra um novo presente
  saveGift(): void {
    if (!this.newGift.name || !this.newGift.value) {
      alert('Por favor, preencha o nome e o valor da meta.');
      return;
    }

    // Inicializadores padrão para um novo presente enviado à API
    const giftPayload: Gift = {
      name: this.newGift.name,
      type: this.newGift.type || 'Casa',
      value: Number(this.newGift.value),
      description: this.newGift.description || '',
      imageUrl: this.newGift.imageUrl || '',
      collected: 0,
      status: 'ATIVO',
    };

    this.giftService.addGift(giftPayload).subscribe({
      next: (savedGift) => {
        this.allGifts.push(savedGift);
        this.applyFilterAndSearch();
        this.isFormOpen = false;
        this.newGift = {};
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
  }

  cancelEdit(): void {
    this.editingId = undefined;
    this.editedGift = {};
  }

  // PUT: Atualiza as edições na linha correspondente
  saveEdit(): void {
    if (!this.editingId || !this.editedGift.name || !this.editedGift.value) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    this.giftService.updateGift(this.editingId, this.editedGift as Gift).subscribe({
      next: (updatedGift) => {
        const index = this.allGifts.findIndex((g) => g.id === this.editingId);
        if (index !== -1) {
          this.allGifts[index] = updatedGift;
        }
        this.applyFilterAndSearch();
        this.editingId = undefined;
        this.editedGift = {};
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar o presente.');
      },
    });
  }

  // DELETE: Remove o item
  deleteEvent(gift: Gift): void {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o presente "${gift.name}"?`,
    );

    if (confirmDelete && gift.id) {
      this.giftService.deleteGift(gift.id).subscribe({
        next: () => {
          this.allGifts = this.allGifts.filter((g) => g.id !== gift.id);
          this.applyFilterAndSearch();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao deletar o presente.');
        },
      });
    }
  }
  
  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.selectedFile = file;

    // Converte o arquivo em DataURL para exibir na tela antes de salvar
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
 }
}
