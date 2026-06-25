import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Centraliza a URL base da sua API
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  /**
   * GET - Busca dados
   * @param route Ex: 'users' ou 'users/1'
   */
  get<T>(route: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${route}`);
  }

  /**
   * POST - Cria um novo registro
   * @param route Ex: 'users'
   * @param body Dados a serem enviados
   */
  post<T>(route: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${route}`, body);
  }

  /**
   * PUT - Atualiza um registro existente
   * @param route Ex: 'users/1'
   * @param body Dados atualizados
   */
  put<T>(route: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${route}`, body);
  }

  /**
   * DELETE - Remove um registro
   * @param route Ex: 'users/1'
   */
  delete<T>(route: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${route}`);
  }
}
