import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login-page/login-page';
import { AppRoutingModule } from "../../app-routing-module";

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [LoginPage]
})
export class AuthModule { }
