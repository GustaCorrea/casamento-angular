import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/common/button-component/button-component';
import { HeaderComponent } from './components/layouts/header-component/header-component';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
