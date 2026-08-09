import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = payload.exp * 1000; 
      const now = new Date().getTime();

      if (now < expirationDate) {
        return true; 
      } else {
        authService.logout(); 
        router.navigate(['/auth/login']);
        return false;
      }
    } catch (e) {
      authService.logout();
      router.navigate(['/auth/login']);
      return false;
    }
  }
  router.navigate(['/auth/login']);
  return false;
};