import { Component, OnInit } from '@angular/core';
import { AdmGuestsService } from '../../services/adm-guests-service';

@Component({
  selector: 'app-adm-guests-page',
  standalone: false,
  templateUrl: './adm-guests-page.html',
})
export class AdmGuestsPage implements OnInit {
  guests: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private guestsService: AdmGuestsService) {}

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.isLoading = true;
    this.guestsService.getGuests().subscribe({
      next: (data) => {
        this.guests = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar convidados.';
        this.isLoading = false;
      }
    });
  }
}
