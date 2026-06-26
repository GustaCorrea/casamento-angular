import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterGuestPipe } from './pipes/filter-adm-guests-pipe';
import { SchedulePage } from './pages/schedule-page/schedule-page';
import { GiftPage } from './pages/gift-page/gift-page';
import { GuestPage } from './pages/guest-page/guest-page';

@NgModule({
  declarations: [FilterGuestPipe, SchedulePage, GiftPage, GuestPage],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [],
})
export class AdminModule {}
