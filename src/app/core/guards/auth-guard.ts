import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Checks if the user is logged in based on the token in AuthService
  if (authService.isLoggedIn()) {
    return true;
  }

  // Se não tem token, chuta o usuário para o login
  router.navigate(['/auth/login']);
  return false;
};
