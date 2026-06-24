import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GiftItem } from '../../constants/GiftItem';

@Component({
  selector: 'marketplace-card-component',
  standalone: false,
  templateUrl: './card-component.html'
})
export class CardComponent {
  @Input() gift!: GiftItem;

  // Recebe a função do pai. Ela aceita um GiftItem e retorna um número.
  @Input() getPercentage!: (gift: GiftItem) => number;

  @Output() onContribute = new EventEmitter<GiftItem>();

  contribute(): void {
    this.onContribute.emit(this.gift);
  }
}
