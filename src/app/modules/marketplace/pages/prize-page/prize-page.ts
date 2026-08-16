import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';
import { ApiService } from '../../../../core/services/api-service';

@Component({
  selector: 'app-prize-page',
  standalone: false,
  templateUrl: './prize-page.html',
})
export class PrizePage implements OnInit {
  categories: string[] = ['Todos', 'Viagem', 'Experiencia', 'Casa', 'Eletrodomestico'];
  filter: string = 'Todos';
  sortOrder: string = 'padrao'; // Variável para controlar a ordenação
  selectedGift: Gift | null = null;
  allGifts: Gift[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadGifts();
  }

  loadGifts(): void {
    this.api.get<Gift[]>('gifts').subscribe({
      next: (dadosDoBackend: Gift[]) => {
        this.allGifts = dadosDoBackend;
        this.cdr.detectChanges(); 
      },
      error: (err) => console.error('Erro ao buscar presentes do backend:', err)
    });
  }

  get filteredGifts(): Gift[] {
    // 1. Filtra apenas os ativos
    const presentesAtivos = this.allGifts.filter(g => g.status === 'ATIVO');
    
    // 2. Filtra por Categoria
    let resultado = presentesAtivos;
    if (this.filter !== 'Todos') {
      resultado = presentesAtivos.filter((g: Gift) => {
        const giftCategory = (g.type || '').toUpperCase();
        return giftCategory === this.filter.toUpperCase();
      });
    }

    // 3. Aplica a Ordenação por Valor
    if (this.sortOrder === 'menor-maior') {
      // O spread [...] cria uma cópia do array para não mutar o original
      resultado = [...resultado].sort((a, b) => (a.value || 0) - (b.value || 0));
    } else if (this.sortOrder === 'maior-menor') {
      resultado = [...resultado].sort((a, b) => (b.value || 0) - (a.value || 0));
    }

    return resultado;
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  setSortOrder(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortOrder = target.value;
  }

  openModal(gift: Gift): void {
    this.selectedGift = gift;
  }

  closeModal(): void {
    this.selectedGift = null;
  }
}