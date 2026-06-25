import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmGuestsComponent } from './pages/adm-guests-page/admin-guests-page';
import { FilterAdmGuestsPipe } from './pipes/filter-adm-guests-pipe';

@NgModule({
  declarations: [AdmGuestsComponent, FilterAdmGuestsPipe],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [AdmGuestsComponent],
})
export class AdminModule {}
