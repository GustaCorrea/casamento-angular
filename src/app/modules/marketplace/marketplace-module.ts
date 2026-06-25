import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizePage } from './pages/prize-page/prize-page';
import { CardComponent } from './components/card-component/card-component';
import { Modal } from './components/modal/modal';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CardComponent, PrizePage, Modal],
  exports: [PrizePage],
})
export class MarketplaceModule {}
