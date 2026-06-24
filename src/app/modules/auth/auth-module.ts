import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login-page/login-page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [LoginPage]
})
export class AuthModule { }
