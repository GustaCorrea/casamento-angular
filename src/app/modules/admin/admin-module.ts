import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmGuestsComponent } from './pages/admin-guests-page/admin-guests-page';
import { FilterAdmGuestsPipe } from './pipes/filter-adm-guests-pipe';
import { PresentesPage } from './pages/presentes-page/presentes-page';
import { SchedulePage } from './pages/schedule-page/schedule-page';

@NgModule({
  declarations: [AdmGuestsComponent, FilterAdmGuestsPipe, PresentesPage, SchedulePage],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [AdmGuestsComponent],
})
export class AdminModule {}
