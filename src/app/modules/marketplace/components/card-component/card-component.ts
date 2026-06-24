import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GiftItem } from '../../constants/GiftItem';

@Component({
  selector: 'marketplace-card-component',
  standalone: false,
  templateUrl: './card-component.html',
  styleUrl: './card-component.css',
})
export class CardComponent {
  @Input({ required: true }) gift!: GiftItem;
  
  @Output() onContribute = new EventEmitter<GiftItem>();

  contribute(): void {
    this.onContribute.emit(this.gift);
  }
}
