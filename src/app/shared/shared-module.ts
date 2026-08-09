import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layouts/header-component/header-component';
import { HomePage } from './pages/home-page/home-page';
import { AppRoutingModule } from '../app-routing-module';
import { FooterComponent } from './components/layouts/footer-component/footer-component';
import { TimelineComponent } from './components/home/timeline-component/timeline-component';
import { HistoryComponent } from './components/home/history-component/history-component';
import { SidebarComponent } from './components/layouts/sidebar-component/sidebar-component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomePage,
    FooterComponent,
    TimelineComponent,
    HistoryComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
})
export class SharedModule {}
