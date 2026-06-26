import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule/schedule-service';
import { Schedule } from '../../../../shared/constants/Schedule';

@Component({
  selector: 'admin-schedule-page',
  standalone: false,
  templateUrl: './schedule-page.html'
})
export class SchedulePage implements OnInit {

  events: Schedule[] = [];
  searchTerm: string = '';
  selectedType: string = 'Todos';

  // Controle do Formulário Inline
  isFormOpen: boolean = false;
  newEvent: Partial<Schedule> = {};

  weddingDate: string = '2026-10-10';
  timeInput: string = '';

  editingId: number | undefined = undefined;
  editedEvent: Partial<Schedule> = {};
  editTimeInput: string = '';

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit() {
    this.loadEvents();
  }

  // GET: Carrega todos os eventos do backend
  loadEvents() {
    this.scheduleService.getSchedules().subscribe({
      next: (data) => {
        this.events = data;
        this.sortEvents();
      },
      error: (err) => console.error('Erro ao carregar eventos:', err)
    });
  }

  get filteredEvents() {
    return this.events.filter(event => {
      const matchSearch = (event.title?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false) ||
                          (event.locationName?.toLowerCase().includes(this.searchTerm.toLowerCase()) || false);
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

  // POST: Cria um novo evento
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

    this.scheduleService.addSchedule(this.newEvent as Schedule).subscribe({
      next: (savedEvent) => {
        this.events.push(savedEvent);
        this.sortEvents();
        this.isFormOpen = false;
        this.newEvent = {};
        this.timeInput = '';
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao salvar o evento.');
      }
    });
  }

  startEditing(event: Schedule) {
    this.editingId = event.id;
    this.editedEvent = { ...event };

    if (event.dateTime) {
      this.editTimeInput = event.dateTime.split('T')[1].substring(0, 5);
    }
  }

  cancelEdit() {
    this.editingId = undefined;
    this.editedEvent = {};
    this.editTimeInput = '';
  }

  // PUT: Atualiza um evento existente
  saveEdit() {
    if (!this.editTimeInput || !this.editingId) {
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

    this.scheduleService.updateSchedule(this.editingId, this.editedEvent as Schedule).subscribe({
      next: (updatedEvent) => {
        const index = this.events.findIndex(e => e.id === this.editingId);
        if (index !== -1) {
          this.events[index] = updatedEvent;
        }
        this.sortEvents();
        this.editingId = undefined;
        this.editedEvent = {};
        this.editTimeInput = '';
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar o evento.');
      }
    });
  }

  // DELETE: Remove o evento
  deleteEvent(event: Schedule) {
    const confirmDelete = window.confirm(`Tem certeza que deseja excluir o evento "${event.title}"?`);

    if (confirmDelete && event.id) {
      this.scheduleService.deleteSchedule(event.id).subscribe({
        next: () => {
          this.events = this.events.filter(e => e.id !== event.id);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao deletar o evento.');
        }
      });
    }
  }
}
