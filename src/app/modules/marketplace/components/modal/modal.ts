import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GiftItem } from '../../constants/GiftItem';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html'
})
export class Modal {
  @Input() gift: GiftItem | null = null;
  @Output() close = new EventEmitter<void>();

  predefinedValues = [50, 100, 200, 500];
  selectedValue: number = 50;
  
  customValue: string = '';
  donorName: string = '';
  message: string = '';

  selectValue(value: number): void {
    this.selectedValue = value;
    this.customValue = '';
  }

  closeModal(): void {
    this.close.emit();
  }

  submitContribution(): void {
    const finalValue = this.customValue ? parseFloat(this.customValue) : this.selectedValue;
    
    const contributionData = {
      giftId: this.gift?.id,
      amount: finalValue,
      name: this.donorName,
      message: this.message
    };

    console.log('Processando pagamento:', contributionData);
    
    this.closeModal();
  }
}