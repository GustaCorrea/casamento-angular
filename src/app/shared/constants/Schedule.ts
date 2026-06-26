export type EventType = 'CERIMONIA' | 'RECEPCAO' | 'JANTAR' | 'CELEBRACAO';

export interface Schedule {
  id?: number;
  title: string;
  description: string;
  eventDate: string;
  location: string;
  time: string;
  type: EventType;
}
