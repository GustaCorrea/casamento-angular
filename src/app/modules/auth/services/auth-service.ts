import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private api: ApiService) {}

  login(credentials: any): Observable<any> {
    return this.api.post<any>("auth/login", credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem("jwt_token", response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
  }
}
