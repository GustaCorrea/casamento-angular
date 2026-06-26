export type EventType = 'CERIMONIA' | 'RECEPCAO' | 'JANTAR' | 'CELEBRACAO';

export interface Schedule {
  id?: number;
  title: string;
  description: string;
  dateTime: string;
  locationName: string;
  type: EventType;
}
