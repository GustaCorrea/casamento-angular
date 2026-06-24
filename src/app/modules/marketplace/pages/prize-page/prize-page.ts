import { Component } from '@angular/core';
import { GiftItem } from '../../constants/GiftItem';

@Component({
  selector: 'app-prize-page',
  standalone: false,
  templateUrl: './prize-page.html',
})
export class PrizePage {
  categories: string[] = ["Todos", "Viagem", "Experiência", "Casa", "Eletrodoméstico"];
  filter: string = "Todos";
  selectedGift: GiftItem | null = null;

  gifts: GiftItem[] = [
    { id: 1, title: "Lua de Mel em Cancún", description: "Contribua para a viagem dos noivos para o paraíso caribenho", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&auto=format", targetAmount: 8000, currentAmount: 5200, category: "Viagem" },
    { id: 2, title: "Jantar Romântico em Paris", description: "Experiência gastronômica inesquecível para o casal", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&auto=format", targetAmount: 3000, currentAmount: 3000, category: "Experiência" },
    { id: 3, title: "Jogo de Panelas Tramontina", description: "Conjunto completo para a nova casa do casal", imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format", targetAmount: 1200, currentAmount: 900, category: "Casa" },
    { id: 4, title: "Sofá para a Sala", description: "Sofá retrátil 3 lugares para o novo lar", imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format", targetAmount: 4500, currentAmount: 1500, category: "Casa" },
    { id: 5, title: "Smart TV 65\"", description: "Televisão para os filmes de domingo do casal", imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&auto=format", targetAmount: 3500, currentAmount: 2100, category: "Eletrodoméstico" },
    { id: 6, title: "Churrasqueira a Gás", description: "Para os encontros com família e amigos", imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format", targetAmount: 2200, currentAmount: 800, category: "Casa" },
  ];

  get filteredGifts(): GiftItem[] {
    return this.filter === "Todos" ? this.gifts : this.gifts.filter((g: GiftItem) => g.category === this.filter);
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  getPercentage(gift: GiftItem): number {
    return Math.min(100, Math.round((gift.currentAmount / gift.targetAmount) * 100));
  }

  isComplete(gift: GiftItem): boolean {
    return this.getPercentage(gift) >= 100;
  }

  openModal(gift: GiftItem): void {
    if (!this.isComplete(gift)) {
      this.selectedGift = gift;
    }
  }

  closeModal(): void {
    this.selectedGift = null;
  }
}
