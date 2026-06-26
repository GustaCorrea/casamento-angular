import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../../core/services/api-service';
import { Guest } from '../../../../shared/constants/Guest';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private api: ApiService) {}

  // Busca a lista do back-end e mapeia para o formato do Front-end
  getGuests(): Observable<Guest[]> {
    return this.api.get<any[]>('guest').pipe(
      map(backendGifts => backendGifts.map(g => this.convertToFront(g)))
    );
  }

  // Envia dados mapeados para o formato que o VisitorRequestDTO espera
  addGuest(convidado: Guest): Observable<Guest> {
    const body = this.convertToBack(convidado);
    return this.api.post<any>('guest', body).pipe(
      map(g => this.convertToFront(g))
    );
  }

  // Envia dados atualizados mapeados para o formato correto
  updateGuest(id: number, convidado: Guest): Observable<Guest> {
    const body = this.convertToBack(convidado);
    return this.api.put<any>(`guest/${id}`, body).pipe(
      map(g => this.convertToFront(g))
    );
  }

  deleteGuest(id: number): Observable<void> {
    return this.api.delete<void>(`guest/${id}`);
  }

  // --- MÉTODOS AUXILIARES DE CONVERSÃO (DE-PARA) ---

  private convertToFront(b: any): Guest {
    return {
      id: b.id,
      nome: b.name,
      email: b.email,
      restricoes: b.dietaryRestrictions || '',
      limiteAcompanhantes: b.maxCompanions || 0,
      // Converte a propriedade boolean presenceConfirmed para o enum status esperado na tela
      status: b.presenceConfirmed ? 'Confirmado' : 'Aguardando',
      acompanhantes: (b.companions || []).map((c: any) => ({
        nome: c.name,
        email: c.email,
        restricoes: c.dietaryRestriction // mapeia se houver
      }))
    };
  }

  private convertToBack(f: Guest): any {
    return {
      name: f.nome,
      email: f.email || '',
      maxCompanions: f.limiteAcompanhantes || 0,
      dietaryRestrictions: f.restricoes || '',
      companions: (f.acompanhantes || []).map(c => ({
        name: c.nome,
        email: c.email || '',
        dietaryRestriction: (c as any).restricoes || ''
      }))
    };
  }
}
