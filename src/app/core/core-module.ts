import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayout } from './layouts/main-layout/main-layout';
import { RouterModule } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { SharedModule } from '../shared/shared-module';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { InviteLayout } from './layouts/invite-layout/invite-layout';

@NgModule({
  declarations: [
    MainLayout, 
    AuthLayout, 
    AdminLayout, 
    InviteLayout,
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [MainLayout, AuthLayout, AdminLayout, InviteLayout],
})
export class CoreModule { }