import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { HomePage } from './shared/pages/home-page/home-page';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { LoginPage } from './modules/auth/pages/login-page/login-page';
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { PrizePage } from './modules/marketplace/pages/prize-page/prize-page';
import { authGuard } from './core/guards/auth-guard';
import { SchedulePage } from './modules/admin/pages/schedule-page/schedule-page';
import { GiftPage } from './modules/admin/pages/gift-page/gift-page';
import { GuestPage } from './modules/admin/pages/guest-page/guest-page';
import { RsvpPage } from './modules/invite/pages/rsvp-page/rsvp-page';

const routes: Routes = [
  {
    // Layout público
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'presentes', component: PrizePage },
      { path: 'confirmar-presenca', component: RsvpPage }
    ],
  },
  {
    // Layout da Autenticação
    path: 'auth',
    component: AuthLayout,
    children: [{ path: 'login', component: LoginPage }],
  },
    // Layout do Painel Administrador
  {
    path: "system",
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: "convidados", component: GuestPage },
      { path: "presentes", component: GiftPage },
      { path: "cronograma", component: SchedulePage }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
