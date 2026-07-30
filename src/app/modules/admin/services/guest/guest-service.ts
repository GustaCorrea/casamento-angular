import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api-service';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private api: ApiService) {}

  getGuests(): Observable<any[]> {
    return this.api.get<any[]>('guest').pipe(
      map(backendGuests => backendGuests.map(g => this.convertToFront(g)))
    );
  }

  addGuest(convidado: any): Observable<any> {
    const body = this.convertToBack(convidado);
    return this.api.post<any>('guest', body).pipe(
      map(g => this.convertToFront(g))
    );
  }

  updateGuest(id: number, convidado: any): Observable<any> {
    const body = this.convertToBack(convidado);
    return this.api.put<any>(`guest/${id}`, body).pipe(
      map(g => this.convertToFront(g))
    );
  }

  deleteGuest(id: number): Observable<void> {
    return this.api.delete<void>(`guest/${id}`);
  }

  confirmPresencePublic(id: number): Observable<any> {
    return this.api.post<any>(`guest/${id}/confirm`, {}).pipe(
      map(g => this.convertToFront(g))
    );
  }

  // --- MÉTODOS AUXILIARES LIMPOS ---

  private convertToFront(b: any): any {
    return {
      id: b.id,
      nome: b.name,
      email: b.email || '',
      telefone: b.phone || '', 
      status: b.presenceConfirmed ? 'Confirmado' : 'Aguardando'
    };
  }

  private convertToBack(f: any): any {
    return {
      name: f.nome || f.name,
      email: f.email || null,
      phone: f.telefone || f.phone || null, 
      presenceConfirmed: f.status === 'Confirmado'
    };
  }
}