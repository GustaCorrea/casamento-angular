import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';
import { ApiService } from '../../../../core/services/api-service';


@Component({
  selector: 'app-prize-page',
  standalone: false,
  templateUrl: './prize-page.html',
})
export class PrizePage implements OnInit {
  categories: string[] = ['Todos', 'Viagem', 'Experiência', 'Casa', 'Eletrodoméstico'];
  filter: string = 'Todos';
  selectedGift: Gift | null = null;

  // Lista de presentes vinda do Banco de Dados
  allGifts: Gift[] = [];

  constructor(
    private api: ApiService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadGifts();
  }

  loadGifts(): void {
    this.api.get<Gift[]>('gifts').subscribe({
      next: (dadosDoBackend: Gift[]) => {
        this.allGifts = dadosDoBackend;
        this.cdr.detectChanges(); // Garante atualização do DOM
      },
      error: (err) => {
        console.error('Erro ao buscar presentes do backend:', err);
      }
    });
  }

  // Filtro corrigido com tratamento seguro para 'type' ou 'category' opcionais/undefined
  get filteredGifts(): Gift[] {
    if (this.filter === 'Todos') {
      return this.allGifts;
    }
    
    return this.allGifts.filter((g: Gift) => {
      const giftCategory = (g.type || g.category || '').toUpperCase();
      return giftCategory === this.filter.toUpperCase();
    });
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  getPercentage = (gift: Gift): number => {
    if (!gift.value) return 0;
    return Math.min(100, Math.round(((gift.collected || 0) / gift.value) * 100));
  };

  isComplete(gift: Gift): boolean {
    return this.getPercentage(gift) >= 100;
  }

  openModal(gift: Gift): void {
    if (!this.isComplete(gift)) {
      this.selectedGift = gift;
    }
  }

  closeModal(): void {
    this.selectedGift = null;
  }
}