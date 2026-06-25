import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentesPage } from './pages/presentes-page/presentes-page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PresentesPage],
  imports: [CommonModule, FormsModule],
})
export class AdminModule {}
