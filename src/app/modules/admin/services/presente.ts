import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Gift } from '../../../core/models/gift';

@Injectable({
  providedIn: 'root',
})
export class Presente {

  // URL base da sua API Spring Boot

  // O array do gift (temporariamente)
  private mockGifts: Gift[] = [
    { id: 1, name: 'Lua de Mel em Cancún', description: 'Cotas', totalValue: 8000, collected: 5200, category: 'Viagem', status: 'ATIVO' },
    { id: 2, name: 'Jantar Romântico em Paris', description: 'Torre', totalValue: 3000, collected: 3000, category: 'Experiência', status: 'COMPLETO' }
  ];

  constructor(private http: HttpClient) { }

  // Método GET
  getGifts(): Observable<Gift[]> {
    // JAVA: return this.http.get<Gift[]>(this.apiUrl);
    return of(this.mockGifts); 
  }

  // Método POST
  createGift(gift: Gift): Observable<Gift> {
  // Java: return this.http.post<Gift>(this.apiUrl, gift);
    gift.id = Math.floor(Math.random() * 1000); // Simulando o ID do banco
    this.mockGifts.push(gift);
    return of(gift);
  }

}
