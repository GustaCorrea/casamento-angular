import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Substitua pela URL real do seu Spring Boot se necessário
  private readonly API_URL = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Faz a chamada real para o servidor
    return this.http.post<any>(this.API_URL, credentials).pipe(
      tap(response => {
        // Salva o JWT no localStorage se a requisição for sucesso
        if (response && response.token) {
          localStorage.setItem('jwt_token', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }
}
