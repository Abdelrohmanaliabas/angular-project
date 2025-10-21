import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventsService } from '../../../core/services/events.service';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-calender',
  imports: [CommonModule],
  templateUrl: './calender.html',
  styleUrl: './calender.css'
})
export class Calender {
  private eventsService = inject(EventsService);
  private router = inject(Router);
  events: any[] = [];

  ngOnInit() {
    this.eventsService.list().subscribe((data) => {
      this.events = data.map(e => ({
        id: e.id,
        title: e.title,
        start: e.startDate,
        end: e.endDate,
        color: this.getEventColor(e.status),
        extendedProps: e
      }));
      this.renderCalendar();
    });
  }

  renderCalendar() {
    const el = document.getElementById('calendar');
    if (!el) return;

    const calendar = new Calendar(el, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      height: 'auto',
      events: this.events,
      eventClick: (info) => this.onEventClick(info.event),
      displayEventTime: false,
      eventColor: '#0ea5e9',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
    });

    calendar.render();
  }

  onEventClick(event: any) {
    const id = event.id;
    this.router.navigate([`/dashboard/events/${id}`]);
  }

  getEventColor(status: string): string {
    switch (status) {
      case 'Upcoming':
        return '#0ea5e9';
      case 'Completed':
        return '#22c55e';
      case 'Cancelled':
        return '#ef4444';
      default:
        return '#a855f7';
    }
  }
}
