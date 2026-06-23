import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/common/button-component/button-component';
import { HeaderComponent } from './components/layouts/header-component/header-component';
import { HomePage } from './pages/home-page/home-page';
import { AppRoutingModule } from '../app-routing-module';
import { FooterComponent } from './components/layouts/footer-component/footer-component';
import { TimelineComponent } from './components/home/timeline-component/timeline-component';

@NgModule({
  declarations: [
    ButtonComponent,
    HeaderComponent,
    HomePage,
    FooterComponent,
    TimelineComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent],
})
export class SharedModule {}
