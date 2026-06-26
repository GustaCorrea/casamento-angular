import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Importe o ChangeDetectorRef
import { ApiService } from '../../../../core/services/api-service';
import { Observable } from 'rxjs';
import { Schedule } from '../../../constants/Schedule';

interface TimelineItem {
  time: string;
  event: string;
  location: string;
}

@Component({
  selector: 'home-timeline-component',
  standalone: false,
  templateUrl: './timeline-component.html',
})
export class TimelineComponent implements OnInit {
  timeline: TimelineItem[] = [];

  // Injete o cdr no construtor
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  getSchedules(): Observable<Schedule[]> {
    return this.api.get<Schedule[]>('schedules');
  }

  ngOnInit(): void {
    this.loadTimeline();
  }

  loadTimeline(): void {
    this.getSchedules().subscribe({
      next: (dadosDoBackend: Schedule[]) => {
        // Criamos uma nova referência de array usando o spread operator [...]
        this.timeline = [...dadosDoBackend.map((item: Schedule) => {
          return {
            time: item.time ? item.time.split('T')[1].substring(0, 5) : '00:00',
            event: item.title,
            location: item.location,
          };
        })];

        // Força a renderização do HTML
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar a timeline:', err);
      },
    });
  }
}
