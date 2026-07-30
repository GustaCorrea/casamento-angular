import { Component, OnInit } from '@angular/core';
import { Guest } from '../../../../shared/constants/Guest';
import { GuestService } from '../../../admin/services/guest/guest-service';


@Component({
  selector: 'app-rsvp-page',
  standalone: false,
  templateUrl: './rsvp-page.html'
})
export class RsvpPage implements OnInit {
  searchQuery: string = '';
  allGuests: Guest[] = [];
  filteredGuests: Guest[] = [];
  
  // O "Set" é perfeito para guardar IDs únicos de quem foi marcado no checkbox
  selectedGuests: Set<number> = new Set<number>();
  
  successMessage: boolean = false;

  constructor(private guestService: GuestService) {}

  ngOnInit(): void {
    // Carrega todos os convidados silenciosamente quando a tela abre
    this.guestService.getGuests().subscribe({
      next: (guests) => {
        this.allGuests = guests;
      },
      error: (err) => console.error('Erro ao buscar convidados', err)
    });
  }

  // Filtra a lista localmente enquanto a pessoa digita
  filterGuests(): void {
    const query = this.searchQuery.toLowerCase().trim();
    
    // Só começa a filtrar se a pessoa digitou pelo menos 3 letras
    if (query.length < 3) {
      this.filteredGuests = [];
      return;
    }

    this.filteredGuests = this.allGuests.filter(guest => 
      guest.nome.toLowerCase().includes(query)
    );
  }

  // Marca ou desmarca a caixinha
  toggleSelection(guestId: number): void {
    if (this.selectedGuests.has(guestId)) {
      this.selectedGuests.delete(guestId);
    } else {
      this.selectedGuests.add(guestId);
    }
  }

  // Envia a confirmação
  confirmPresence(): void {
    if (this.selectedGuests.size === 0) return;

    const idsToConfirm = Array.from(this.selectedGuests);
    let completedRequests = 0;
    let hasError = false;

    idsToConfirm.forEach(id => {
      // Agora usamos a rota pública correta!
      this.guestService.confirmPresencePublic(id).subscribe({
        next: (updatedGuest) => {
          completedRequests++;
          
          // Atualiza a lista local com os dados reais que voltaram do banco
          const guestIndex = this.allGuests.findIndex(g => g.id === id);
          if (guestIndex !== -1) {
            this.allGuests[guestIndex] = updatedGuest;
          }
          
          // Só mostra o sucesso se todas as requisições terminarem sem erro
          if (completedRequests === idsToConfirm.length && !hasError) {
            this.successMessage = true;
            this.selectedGuests.clear();
            this.filterGuests(); // Atualiza a tela
            
            setTimeout(() => {
              this.successMessage = false;
            }, 5000);
          }
        },
        error: (err) => {
          console.error('Erro ao confirmar presença', err);
          hasError = true;
          alert('Ops! Tivemos um problema de conexão. Tente confirmar novamente.');
        }
      });
    });
  }

  getSelectedNames(): string {
  // Pega os IDs selecionados e busca os nomes correspondentes
  const names = Array.from(this.selectedGuests)
    .map(id => {
      const guest = this.allGuests.find(g => g.id === id);
      return guest ? guest.nome : '';
    })
    .filter(nome => nome !== ''); // Remove possíveis vazios

  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} e ${names[1]}`;
  
  // Se tiver mais de 2, coloca vírgula nos primeiros e "e" no último
  const last = names.pop();
  return `${names.join(', ')} e ${last}`;
}
}