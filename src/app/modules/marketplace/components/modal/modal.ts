import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';
import { ApiService } from '../../../../core/services/api-service'; // Importe seu ApiService

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html'
})
export class Modal {
  @Input() gift: Gift | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() donationSuccess = new EventEmitter<void>(); // Novo evento para avisar a página pai que deu certo e atualizar a listagem

  predefinedValues = [50, 100, 200, 500];
  selectedValue: number = 50;

  customValue: string = '';
  donorName: string = '';
  message: string = '';

  // 1. Injeta o ApiService no construtor
  constructor(private api: ApiService) {}

  get displayValue(): string {
    const parsed = parseFloat(this.customValue);
    if (!isNaN(parsed) && parsed > 0) return parsed.toString();
    if (this.selectedValue) return this.selectedValue.toString();
    return '—';
  }

  selectValue(value: number): void {
    this.selectedValue = value;
    this.customValue = '';
  }

  onCustomValueInput(event: Event): void {
    this.customValue = (event.target as HTMLInputElement).value;
    if (this.customValue) {
      this.selectedValue = 0;
    }
  }

  stepCustomValue(step: number): void {
    const current = parseFloat(this.customValue) || 0;
    const next = Math.max(0, current + step);
    this.customValue = next > 0 ? next.toString() : '';
    this.selectedValue = 0;
  }

  closeModal(): void {
    this.close.emit();
  }

  submitContribution(): void {
    const finalValue = parseFloat(this.customValue) || this.selectedValue;

    if (!this.gift || !this.gift.id) {
      alert('Erro: Presente inválido.');
      return;
    }

    if (!finalValue || finalValue <= 0) {
      alert('Por favor, selecione ou informe um valor.');
      return;
    }

    if (!this.donorName.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    // 2. Monta o objeto no formato exato que o seu DonationRequestDTO do Java espera!
    // Lembra do seu record: name, value, message
    const contributionData = {
      name: this.donorName.trim(),
      value: finalValue,
      message: this.message.trim() || null // se tiver vazio envia nulo suave
    };

    // 3. Faz a requisição PUT usando a rota correta do Back-end
    // A rota no Java é: @PutMapping("/donate/{id}")
    this.api.put<void>(`gifts/donate/${this.gift.id}`, contributionData).subscribe({
      next: () => {
        alert('Muito obrigado! Sua contribuição foi recebida com sucesso.');
        this.donationSuccess.emit(); // Emite o evento para a página pai recarregar os saldos
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao processar doação:', err);
        // Exibe a mensagem de erro que você configurou no Java caso o presente esteja COMPLETO
        const errorMessage = err?.error?.message || 'Erro ao processar doação. Tente novamente.';
        alert(errorMessage);
      }
    });
  }
}
