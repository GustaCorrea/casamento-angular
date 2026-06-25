import { Component, OnInit } from '@angular/core';
import { ScheduleEvent } from '../../../../core/models/schedule-event';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-schedule-page',
  standalone: false,
  templateUrl: './schedule-page.html'
})
export class SchedulePage implements OnInit {

  events: ScheduleEvent[] = [];
  searchTerm: string = '';
  selectedType: string = 'Todos';
  
  // Controle do Formulário Inline
  isFormOpen: boolean = false;
  newEvent: Partial<ScheduleEvent> = {};
  
  weddingDate: string = '2026-10-10';
  timeInput: string = '';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.events = this.scheduleService.getEvents();
    this.sortEvents(); 
  }

  get filteredEvents() {
    return this.events.filter(event => {
      const matchSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          event.locationName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchType = this.selectedType === 'Todos' || event.type === this.selectedType;
      return matchSearch && matchType;
    });
  }

  setType(type: string) {
    this.selectedType = type;
  }

  sortEvents() {
    this.events.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    if (this.isFormOpen) {
      this.newEvent = { type: 'CERIMONIA' }; 
      this.timeInput = '';
    } else {
      this.newEvent = {};
      this.timeInput = '';
    }
  }

  saveEvent() {
    if (!this.timeInput) {
      alert("Por favor, preencha o horário do evento.");
      return;
    }

    const fullDateTime = `${this.weddingDate}T${this.timeInput}:00`;
    const eventDate = new Date(fullDateTime);
    const now = new Date();
    
    if (eventDate < now) {
      alert("Ops! O horário e data deste evento já passaram.");
      return;
    }
    this.newEvent.dateTime = fullDateTime;

    this.newEvent.id = Math.floor(Math.random() * 1000);
    this.events.push(this.newEvent as ScheduleEvent);
    
    this.sortEvents(); 
    this.isFormOpen = false; 
  }

  // CONTROLE DE EDIÇÃO 

  editingId: number | undefined = undefined;
  editedEvent: Partial<ScheduleEvent> = {};
  editTimeInput: string = '';

  startEditing(event: ScheduleEvent) {
    this.editingId = event.id;
    this.editedEvent = { ...event };
    
    // Pega a string '2026-10-10T14:30:00' e corta para ficar só '14:30' no input
    this.editTimeInput = event.dateTime.split('T')[1].substring(0, 5);
  }

  cancelEdit() {
    this.editingId = undefined;
    this.editedEvent = {};
    this.editTimeInput = '';
  }

  saveEdit() {
    if (!this.editTimeInput) {
      alert("Por favor, preencha o horário do evento.");
      return;
    }

    const fullDateTime = `${this.weddingDate}T${this.editTimeInput}:00`;
    const eventDate = new Date(fullDateTime);
    const now = new Date();
    
    if (eventDate < now) {
      alert("Ops! O horário e data deste evento já passaram.");
      return;
    }
    
    this.editedEvent.dateTime = fullDateTime;

    const index = this.events.findIndex(e => e.id === this.editingId);
    if (index !== -1) {
      this.events[index] = { ...this.editedEvent } as ScheduleEvent;
    }

    this.sortEvents();
    this.editingId = undefined;
  }

  // CONTROLE DE EXCLUSÃO 
  deleteEvent(event: ScheduleEvent) {
    // Confirmação antes de deletar
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o evento "${event.title}"?`);
    
    if (confirmDelete) {
      // Futuramente  this.scheduleService.deleteEvent(event.id)...
      this.events = this.events.filter(e => e.id !== event.id);
    }
  }
}