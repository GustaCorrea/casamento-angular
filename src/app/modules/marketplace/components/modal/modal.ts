import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';
import { ApiService } from '../../../../core/services/api-service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html'
})
export class Modal {
  @Input() gift: Gift | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() donationSuccess = new EventEmitter<void>();

  donorName: string = '';
  message: string = '';
  isLoading: boolean = false;

  constructor(private api: ApiService) {}

  closeModal(): void {
    this.close.emit();
  }

  submitContribution(): void {
    // 1. Valida se o presente existe
    if (!this.gift || !this.gift.id) {
      alert('Erro: Presente não selecionado para doação.');
      return;
    }

    if (!this.donorName.trim()) {
      alert('Por favor, preencha o seu nome completo.');
      return;
    }

    this.isLoading = true;

    const donationData = {
      name: this.donorName.trim(),
      message: this.message.trim() || null
    };

    // 4. Dispara a requisição para o Spring Boot
    this.api.post<any>(`gifts/${this.gift.id}/donations`, donationData).subscribe({
      next: (response) => {
        if (response && response.checkoutUrl) {
          window.location.href = response.checkoutUrl; 
        } else {
          alert('Erro ao gerar o link de pagamento. Tente novamente.');
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erro ao gerar link de pagamento:', err);
        const errorMessage = err?.error?.message || 'Ocorreu um erro ao processar o pagamento. Tente novamente.';
        alert(errorMessage);
        this.isLoading = false;
      }
    });
  }
}