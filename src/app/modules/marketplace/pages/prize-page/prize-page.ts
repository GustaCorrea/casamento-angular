
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';
import { ApiService } from '../../../../core/services/api-service'; // Garanta que o caminho está correto
import { Observable } from 'rxjs';

@Component({
  selector: 'app-prize-page',
  standalone: false,
  templateUrl: './prize-page.html',
})
export class PrizePage implements OnInit {
  categories: string[] = ['Todos', 'Viagem', 'Experiência', 'Casa', 'Eletrodoméstico'];
  filter: string = 'Todos';
  selectedGift: Gift | null = null;

  // Lista onde vamos salvar os presentes vindos do Banco de Dados
  allGifts: Gift[] = [];

  // 1. Injeta o ApiService e o ChangeDetectorRef para garantir a renderização
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // 2. Dispara a busca quando a página carrega
    this.loadGifts();
  }

  loadGifts(): void {
    this.api.get<Gift[]>('gifts').subscribe({ // Ajuste a rota para a sua rota de presentes (ex: 'gifts' ou 'prizes')
      next: (dadosDoBackend: Gift[]) => {
        this.allGifts = dadosDoBackend;
        this.cdr.detectChanges(); // Garante que a tela vai atualizar com os novos dados
      },
      error: (err) => {
        console.error('Erro ao buscar presentes do backend:', err);
      }
    });
  }

  // 3. Atualizado para usar o 'allGifts' do banco e tratar letras maiúsculas
  get filteredGifts(): Gift[] {
    if (this.filter === 'Todos') {
      return this.allGifts;
    }
    // O backend retorna "CASA" ou "VIAGEM". O .toUpperCase() faz o filtro bater perfeitamente
    return this.allGifts.filter((g: Gift) => g.type.toUpperCase() === this.filter.toUpperCase());
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  getPercentage(gift: Gift): number {
    if (!gift.value) return 0;
    return Math.min(100, Math.round((gift.collected / gift.value) * 100));
  }

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
