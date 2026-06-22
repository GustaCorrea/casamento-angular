import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/common/button-component/button-component';
import { HeaderComponent } from './components/layouts/header-component/header-component';
import { HomePage } from './pages/home-page/home-page';
import { AppRoutingModule } from "../app-routing-module";

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, HomePage],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent],
})
export class SharedModule {}
