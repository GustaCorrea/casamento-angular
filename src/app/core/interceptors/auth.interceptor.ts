import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // 2. Intercepta erros de resposta (401 / 403)
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        // Limpa o token usando o próprio AuthService
        authService.logout();

        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
