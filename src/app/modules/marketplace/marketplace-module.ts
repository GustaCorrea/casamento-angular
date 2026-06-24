import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrizePage } from './pages/prize-page/prize-page';
import { CardComponent } from './components/card-component/card-component';

@NgModule({
  imports: [CommonModule, PrizePage],
  declarations: [CardComponent],
  exports: [PrizePage],
})
export class MarketplaceModule {}
