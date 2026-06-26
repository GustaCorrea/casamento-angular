import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/api-service';
import { Gift } from '../../../../shared/constants/Gift';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  constructor(private api: ApiService) {}
    getGifts(): Observable<Gift[]> {
      return this.api.get<Gift[]>('gifts');
    }

    addGift(convidado: Gift): Observable<Gift> {
      return this.api.post<Gift>('gifts', convidado);
    }

    updateGift(id: number, convidado: Gift): Observable<Gift> {
      return this.api.put<Gift>(`gifts/${id}`, convidado);
    }

    deleteGift(id: number): Observable<void> {
      return this.api.delete<void>(`gifts/${id}`);
    }
}
