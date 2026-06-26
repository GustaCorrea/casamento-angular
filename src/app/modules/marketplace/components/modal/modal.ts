import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html'
})
export class Modal {
  @Input() gift: Gift | null = null;
  @Output() close = new EventEmitter<void>();

  predefinedValues = [50, 100, 200, 500];
  selectedValue: number = 50;

  customValue: string = '';
  donorName: string = '';
  message: string = '';

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

    if (!finalValue || finalValue <= 0) {
      alert('Por favor, selecione ou informe um valor.');
      return;
    }

    if (!this.donorName.trim()) {
      alert('Por favor, informe seu nome.');
      return;
    }

    const contributionData = {
      giftId: this.gift?.id,
      amount: finalValue,
      name: this.donorName.trim(),
      message: this.message.trim()
    };

    console.log('Processando pagamento:', contributionData);
    this.closeModal();
  }
}
