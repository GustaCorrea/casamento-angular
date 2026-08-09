import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialLogin());
  
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private api: ApiService) {}

  login(credentials: any): Observable<any> {
    return this.api.post<any>("auth/login", credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem("jwt_token", response.token);
          this.loggedIn.next(true); 
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem("jwt_token");
  }

  private checkInitialLogin(): boolean {
    return !!localStorage.getItem("jwt_token");
  }

  logout(): void {
    localStorage.removeItem("jwt_token");
    this.loggedIn.next(false); 
  }
}