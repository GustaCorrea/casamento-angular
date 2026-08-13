import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizePage } from './pages/prize-page/prize-page';
import { CardComponent } from './components/card-component/card-component';
import { Modal } from './components/modal/modal';
import { FormsModule } from '@angular/forms';
import { SuccessPage } from './pages/success-page/success-page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [CardComponent, PrizePage, Modal, SuccessPage],
  exports: [PrizePage],
})
export class MarketplaceModule {}
