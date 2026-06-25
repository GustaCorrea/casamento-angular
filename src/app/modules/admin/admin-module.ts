import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdmGuestsComponent } from './pages/adm-guests-page/admin-guests-page';
import { FilterAdmGuestsPipe } from './pipes/filter-adm-guests-pipe';
import { PresentesPage } from './pages/presentes-page/presentes-page'; 

@NgModule({
  declarations: [
    AdmGuestsComponent, 
    FilterAdmGuestsPipe,
    PresentesPage 
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [
    AdmGuestsComponent
  ]
})
export class AdminModule {}