import { Injectable } from '@angular/core';
import { ScheduleEvent } from '../../../core/models/schedule-event';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  //lista temporária
  private mockEvents: ScheduleEvent[] = [
    { id: 1, title: 'Cerimônia Civil', description: 'Assinatura dos papéis', dateTime: '2026-10-10T14:00:00', locationName: 'Cartório Central', type: 'CERIMONIA' },
    { id: 2, title: 'Cerimônia Religiosa', description: 'Bênção', dateTime: '2026-10-10T16:00:00', locationName: 'Igreja Nossa Senhora das Graças', type: 'CERIMONIA' },
    { id: 3, title: 'Coquetel de Boas-Vindas', description: 'Entradas e drinks', dateTime: '2026-10-10T18:00:00', locationName: 'Salão Jardim', type: 'RECEPCAO' },
  ];

  constructor() { }
  
  getEvents(): ScheduleEvent[] {
    return this.mockEvents; 
  }

}