import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { HomePage } from './shared/pages/home-page/home-page';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { LoginPage } from './modules/auth/pages/login-page/login-page';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { InvitePage } from './shared/pages/invite-page/invite-page';

const routes: Routes = [
  {
    // Layout público
    path: '',
    component: MainLayout,
    children: [{ path: '', component: HomePage }],
  },
  {
    // Layout de Convites
    path: 'invite',
    component: MainLayout,
    children: [{ path: '', component: InvitePage }],
  },
  {
    // Layout da Autenticação
    path: 'auth',
    component: AuthLayout,
    children: [{ path: 'login', component: LoginPage }],
  },
  {
    // Layout do Painel Administrador
    path: 'system',
    component: AdminLayout,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
