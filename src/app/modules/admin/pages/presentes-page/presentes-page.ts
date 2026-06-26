import { Component, OnInit } from '@angular/core';
import { Presente } from '../../services/presente';
import { Gift } from '../../../../shared/constants/Gift';


@Component({
  selector: 'app-presentes-page',
  standalone: false,
  templateUrl: './presentes-page.html',
})
export class PresentesPage implements OnInit {

  gifts: Gift[] = [];
  filteredGifts: Gift[] = [];
  activeCategory: string = 'Todos';
  editingId: number | null = null;
  editedGift: any = {};

  constructor(private presenteService: Presente) {}

  ngOnInit(): void {
    this.loadGifts();
  }

  // Busca os dados através do Service usando Subscribe
  loadGifts() {
    this.presenteService.getGifts().subscribe({
      next: (data) => {
        this.gifts = data;
        this.filterByCategory(this.activeCategory);
      },
      error: (err) => console.error('Erro ao buscar presentes', err)
    });
  }

  calculatePercentage(collected: number, total: number): number {
    if (total === 0) return 0;
    const percentage = (collected / total) * 100;
    return Math.min(Math.round(percentage), 100);
  }

  filterByCategory(category: string) {
    this.activeCategory = category;
    if (category === 'Todos') {
      this.filteredGifts = [...this.gifts];
    } else {
      this.filteredGifts = this.gifts.filter(g => g.category === category);
    }
  }

  searchGift(event: Event) {
    const term = (event.target as HTMLInputElement).value.toLowerCase();

    if (!term) {
      this.filterByCategory(this.activeCategory);
      return;
    }

    this.filteredGifts = this.gifts.filter(g =>
      g.name.toLowerCase().includes(term) &&
      (this.activeCategory === 'Todos' || g.category === this.activeCategory)
    );
  }

  openNewModal() {
    console.log('Abrir modal zerado para cadastrar');
  }

  openEditModal(gift: Gift) {
    console.log('Abrir modal preenchido com:', gift.name);
  }

  deleteGift(id: number | undefined) {
    if (!id) return;
    if (confirm('Tem certeza que deseja excluir este presente?')) {
      this.gifts = this.gifts.filter(g => g.id !== id);
      this.filterByCategory(this.activeCategory);
    }
  }


  isFormOpen: boolean = false;

  // Objeto temporário que vai receber os dados do HTML
  newGift: Partial<Gift> = {
    name: '',
    description: '',
    totalValue: 0,
    imageUrl: '',
    category: 'Casa'
  };

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }

 saveGift() {
    // Validação inicial
    if (!this.newGift.name || this.newGift.totalValue! <= 0) {
      alert('Por favor, preencha o nome e insira uma meta maior que zero.');
      return;
    }

    // Monta o objeto
    const giftToSave: Gift = {
      name: this.newGift.name!,
      description: this.newGift.description || '',
      totalValue: this.newGift.totalValue!,
      imageUrl: this.newGift.imageUrl || '',
      category: this.newGift.category!,
      collected: 0,
      status: 'ATIVO'
    };

    // Salva através do Service
    this.presenteService.createGift(giftToSave).subscribe({
      next: (savedGift) => {
        this.loadGifts();
        this.isFormOpen = false;

        this.newGift = {
          name: '',
          description: '',
          totalValue: 0,
          imageUrl: '',
          category: 'Casa'
        };
      },
      error: (err) => console.error('Erro ao salvar o presente:', err)
    });
  }

 startEditing(gift: any) {
  this.editingId = gift.id;
  this.editedGift = { ...gift };
 }

 cancelEdit() {
    this.editingId = null;
    this.editedGift = {};
  }

 saveEdit() {
  // Lógica futura da API aqui...

  // Atualizando a lista local
  const index = this.gifts.findIndex(g => g.id === this.editingId);
  if (index !== -1) {
    this.gifts[index] = { ...this.editedGift };
  }

  this.editingId = null;
}
}
