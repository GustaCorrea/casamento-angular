import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { HomePage } from './shared/pages/home-page/home-page';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { LoginPage } from './modules/auth/pages/login-page/login-page';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { PrizePage } from './modules/marketplace/pages/prize-page/prize-page';
import { authGuard } from './core/guards/auth-guard';

const routes: Routes = [
  {
    // Layout público
    path: "",
    component: MainLayout,
    children: [
      { path: "", component: HomePage },
      { path: "presentes", component: PrizePage}
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
    // Layout do Painel Administrador
  {
    path: "system",
    component: AdminLayout,
    canActivate: [authGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
