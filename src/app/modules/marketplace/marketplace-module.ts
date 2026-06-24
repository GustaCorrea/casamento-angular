import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizePage } from './pages/prize-page/prize-page';
import { CardComponent } from './components/card-component/card-component';
import { Modal } from './components/modal/modal';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, PrizePage, Modal],
  exports: [PrizePage],
})
export class MarketplaceModule {}
