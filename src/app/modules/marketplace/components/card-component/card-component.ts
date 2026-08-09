import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gift } from '../../../../shared/constants/Gift';

@Component({
  selector: 'marketplace-card-component',
  standalone: false,
  templateUrl: './card-component.html'
})
export class CardComponent {
  @Input() gift!: Gift;
  @Output() onContribute = new EventEmitter<Gift>();

  contribute(): void {
    this.onContribute.emit(this.gift);
  }
}