export type EventType = 'CERIMONIA' | 'RECEPCAO' | 'JANTAR' | 'CELEBRACAO';

export interface ScheduleEvent {
  id?: number;
  title: string;
  description: string;
  dateTime: string; 
  locationName: string;
  type: EventType;
}