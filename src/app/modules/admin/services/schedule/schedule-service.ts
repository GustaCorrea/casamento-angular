import { Injectable } from '@angular/core';
import { Schedule } from '../../../../shared/constants/Schedule';
import { ApiService } from '../../../../core/services/api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private api: ApiService) {}
  getConvidados(): Observable<Schedule[]> {
    return this.api.get<Schedule[]>('/schedule');
  }

  addConvidado(convidado: Schedule): Observable<Schedule> {
    return this.api.post<Schedule>('/schedule', convidado);
  }

  updateConvidado(id: number, convidado: Schedule): Observable<Schedule> {
    return this.api.put<Schedule>(`/schedule/${id}`, convidado);
  }

  deleteConvidado(id: number): Observable<void> {
    return this.api.delete<void>(`/schedule/${id}`);
  }
}
