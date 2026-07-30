import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';// Ajuste o caminho relativo (../) se necessário para apontar para src/environments/environment
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Agora a URL base é lida dinamicamente a partir do environment gerado pelo .env
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /**
   * Remove barras duplicadas caso a URL do .env termine com '/' e a rota comece com '/'
   */
  private buildUrl(route: string): string {
    const base = this.baseUrl.endsWith('/') ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const path = route.startsWith('/') ? route.slice(1) : route;
    return `${base}/${path}`;
  }

  /**
   * GET - Busca dados
   * @param route Ex: 'users' ou 'users/1'
   */
  get<T>(route: string): Observable<T> {
    return this.http.get<T>(this.buildUrl(route));
  }

  /**
   * POST - Cria um novo registro
   * @param route Ex: 'users'
   * @param body Dados a serem enviados
   */
  post<T>(route: string, body: any): Observable<T> {
    return this.http.post<T>(this.buildUrl(route), body);
  }

  /**
   * PUT - Atualiza um registro existente
   * @param route Ex: 'users/1'
   * @param body Dados atualizados
   */
  put<T>(route: string, body: any): Observable<T> {
    return this.http.put<T>(this.buildUrl(route), body);
  }

  /**
   * DELETE - Remove um registro
   * @param route Ex: 'users/1'
   */
  delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(this.buildUrl(route));
  }
}
