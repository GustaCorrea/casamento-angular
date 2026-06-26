import { Component } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';

@Component({
  selector: 'app-prize-page',
  standalone: false,
  templateUrl: './prize-page.html',
})
export class PrizePage {
  categories: string[] = ['Todos', 'Viagem', 'Experiência', 'Casa', 'Eletrodoméstico'];
  filter: string = 'Todos';
  selectedGift: Gift | null = null;

  gifts: Gift[] = [
    {
      id: 1,
      name: 'Lua de Mel em Cancún',
      description: 'Contribua para a viagem dos noivos para o paraíso caribenho',
      imageUrl:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&auto=format',
      totalValue: 8000,
      collected: 5200,
      category: 'Viagem',
      status: 'ATIVO',
    },
    {
      id: 2,
      name: 'Jantar Romântico em Paris',
      description: 'Experiência gastronômica inesquecível para o casal',
      imageUrl:
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&auto=format',
      totalValue: 3000,
      collected: 3000,
      category: 'Experiência',
      status: 'COMPLETO', // Como o valor total foi atingido, mudei para COMPLETO
    },
    {
      id: 3,
      name: 'Jogo de Panelas Tramontina',
      description: 'Conjunto completo para a nova casa do casal',
      imageUrl:
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format',
      totalValue: 1200,
      collected: 900,
      category: 'Casa',
      status: 'ATIVO',
    },
    {
      id: 4,
      name: 'Sofá para a Sala',
      description: 'Sofá retrátil 3 lugares para o novo lar',
      imageUrl:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format',
      totalValue: 4500,
      collected: 1500,
      category: 'Casa',
      status: 'ATIVO',
    },
    {
      id: 5,
      name: 'Smart TV 65"',
      description: 'Televisão para os filmes de domingo do casal',
      imageUrl:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&auto=format',
      totalValue: 3500,
      collected: 2100,
      category: 'Eletrodoméstico',
      status: 'ATIVO',
    },
    {
      id: 6,
      name: 'Churrasqueira a Gás',
      description: 'Para os encontros com família e amigos',
      imageUrl:
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format',
      totalValue: 2200,
      collected: 800,
      category: 'Casa',
      status: 'ATIVO',
    },
  ];

  get filteredGifts(): Gift[] {
    return this.filter === 'Todos'
      ? this.gifts
      : this.gifts.filter((g: Gift) => g.category === this.filter);
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  getPercentage(gift: Gift): number {
    if (!gift.totalValue) return 0;
    return Math.min(100, Math.round((gift.collected / gift.totalValue) * 100));
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
