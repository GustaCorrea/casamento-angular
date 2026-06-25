import { Component, OnInit } from '@angular/core';
import { Gift } from '../../../../core/models/gift';

@Component({
  selector: 'app-presentes-page',
  standalone: false,
  templateUrl: './presentes-page.html',
  styleUrl: './presentes-page.css',
})
export class PresentesPage implements OnInit {
gifts: Gift[] = [
    {
      id: 1,
      name: 'Lua de Mel em Cancún',
      description: 'Cotas para a nossa viagem inesquecível',
      totalValue: 8000,
      collected: 5200,
      category: 'Viagem',
      status: 'ATIVO'
    },
    {
      id: 2,
      name: 'Jantar Romântico em Paris',
      description: 'Um jantar especial na torre',
      totalValue: 3000,
      collected: 3000,
      category: 'Experiência',
      status: 'COMPLETO'
    }
  ];

  filteredGifts: Gift[] = [];
  activeCategory: string = 'Todos';

  ngOnInit(): void {
    this.filteredGifts = [...this.gifts];
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

}
