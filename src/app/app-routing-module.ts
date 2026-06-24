import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { HomePage } from './shared/pages/home-page/home-page';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { LoginPage } from './modules/auth/pages/login-page/login-page';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { authGuard } from './core/guards/auth-guard';

import { AdmGuestsComponent } from './modules/admin/pages/adm-guests-page/admin-guests-page';

const routes: Routes = [
  {
    // Layout público
    path: "",
    component: MainLayout,
    children: [
      { path: "", component: HomePage }
    ]
  },
  {
    // Layout da Autenticação
    path: "auth",
    component: AuthLayout,
    children: [
      { path: "login", component: LoginPage }
    ]
  },
  {
    // Layout do Painel Administrador
    path: "system",
    component: AdminLayout,
    children: [
      { path: "guests", component: AdmGuestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
