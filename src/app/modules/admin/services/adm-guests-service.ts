import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdmGuestsService {

  constructor(private api: ApiService) {}

  getGuests(): Observable<any> {
    return this.api.get<any>("admin/guests");
  }
}
