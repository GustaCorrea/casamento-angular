import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api-service';
import { Guest } from '../../../../shared/constants/Guest';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  constructor(private api: ApiService) {}
  getGuests(): Observable<Guest[]> {
    return this.api.get<Guest[]>('/guest');
  }

  addGuest(convidado: Guest): Observable<Guest> {
    return this.api.post<Guest>('/guest', convidado);
  }

  updateGuest(id: number, convidado: Guest): Observable<Guest> {
    return this.api.put<Guest>(`/guest/${id}`, convidado);
  }

  deleteGuest(id: number): Observable<void> {
    return this.api.delete<void>(`/guest/${id}`);
  }
}
