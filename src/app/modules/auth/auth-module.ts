import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './pages/login-page/login-page';
import { AppRoutingModule } from "../../app-routing-module";

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, AppRoutingModule],
  exports: [LoginPage]
})
export class AuthModule {}
