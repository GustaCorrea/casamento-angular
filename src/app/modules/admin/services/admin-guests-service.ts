import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-service';

export interface Convidado {
  id?: number;
  nome: string;
  email?: string;
  telefone?: string;
  restricoes: string;
  limiteAcompanhantes: number;
  status: 'Confirmado' | 'Aguardando' | 'Recusado';
  acompanhantes?: { nome: string, email?: string, telefone?: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AdmGuestsService {

  constructor(private api: ApiService) { }
  getConvidados(): Observable<Convidado[]> {
    return this.api.get<Convidado[]>("/admin/convidados");
  }

  addConvidado(convidado: Convidado): Observable<Convidado> {
    return this.api.post<Convidado>("/admin/convidados", convidado);
  }

  updateConvidado(id: number, convidado: Convidado): Observable<Convidado> {
    return this.api.put<Convidado>(`/admin/convidados/${id}`, convidado);
  }

  deleteConvidado(id: number): Observable<void> {
    return this.api.delete<void>(`/admin/convidados/${id}`);
  }
}