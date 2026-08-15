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
    const presentesAtivos = this.allGifts.filter(g => g.status === 'ATIVO');
    if (this.filter === 'Todos') {
      return presentesAtivos;
    }
    return presentesAtivos.filter((g: Gift) => {
      const giftCategory = (g.type || '').toUpperCase();
      return giftCategory === this.filter.toUpperCase();
    });
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  openModal(gift: Gift): void {
    this.selectedGift = gift;
  }

  closeModal(): void {
    this.selectedGift = null;
  }
}