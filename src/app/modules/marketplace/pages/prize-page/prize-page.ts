import { Component } from '@angular/core';

// INTERFACE DIRETA (Evita problemas de caminhos de arquivos e imports ausentes)
export interface Gift {
  id: number;
  name: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  category: string;
}

@Component({
  selector: 'app-prize-page',
  templateUrl: './prize-page.html',
})
export class PrizePage {
  categories: string[] = ["Todos", "Viagem", "Experiência", "Casa", "Eletrodoméstico"];
  filter: string = "Todos";
  selectedGift: Gift | null = null;

  gifts: Gift[] = [
    { id: 1, name: "Lua de Mel em Cancún", description: "Contribua para a viagem dos noivos para o paraíso caribenho", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&auto=format", goal: 8000, raised: 5200, category: "Viagem" },
    { id: 2, name: "Jantar Romântico em Paris", description: "Experiência gastronômica inesquecível para o casal", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&auto=format", goal: 3000, raised: 3000, category: "Experiência" },
    { id: 3, name: "Jogo de Panelas Tramontina", description: "Conjunto completo para a nova casa do casal", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format", goal: 1200, raised: 900, category: "Casa" },
    { id: 4, name: "Sofá para a Sala", description: "Sofá retrátil 3 lugares para o novo lar", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format", goal: 4500, raised: 1500, category: "Casa" },
    { id: 5, name: "Smart TV 65\"", description: "Televisão para os filmes de domingo do casal", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop&auto=format", goal: 3500, raised: 2100, category: "Eletrodoméstico" },
    { id: 6, name: "Churrasqueira a Gás", description: "Para os encontros com família e amigos", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop&auto=format", goal: 2200, raised: 800, category: "Casa" },
  ];

  get filteredGifts(): Gift[] {
    return this.filter === "Todos" ? this.gifts : this.gifts.filter((g: Gift) => g.category === this.filter);
  }

  setFilter(cat: string): void {
    this.filter = cat;
  }

  getPercentage(gift: Gift): number {
    return Math.min(100, Math.round((gift.raised / gift.goal) * 100));
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