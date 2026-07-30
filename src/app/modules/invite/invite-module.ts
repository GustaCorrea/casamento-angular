import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RsvpPage } from './pages/rsvp-page/rsvp-page';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RsvpPage],
  imports: [CommonModule, FormsModule],
})
export class InviteModule {}
