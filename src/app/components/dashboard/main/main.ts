import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-main',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit, AfterViewInit {
  totalRegistrations = 0;
  totalSpeakers = 0;
  newEvents = 0;
  ticketsSold = 0;

  events: any[] = [];
  guests: any[] = [];
  tickets: any[] = [];

  @ViewChild('trafficChart') trafficChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ticketsChart') ticketsChartRef!: ElementRef<HTMLCanvasElement>;
  trafficChart?: Chart;
  ticketsChart?: Chart;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // load data from json-server
    this.loadData();
  }

  ngAfterViewInit(): void {
    // charts will be (re)created after view init and after data loaded
  }

  private loadData() {
    // parallel requests (simple)
    this.http.get<any[]>('http://localhost:3000/events').subscribe(events => {
      this.events = events || [];
      this.newEvents = this.events.length;
      this.createOrUpdateCharts();
    });

    this.http.get<any[]>('http://localhost:3000/guests').subscribe(guests => {
      this.guests = guests || [];
      this.totalRegistrations = this.guests.length;
      this.createOrUpdateCharts();
    });

    // assuming you have a "speakers" or count in events; fallback:
    this.http.get<any[]>('http://localhost:3000/speakers').subscribe(speakers => {
      this.totalSpeakers = (speakers || []).length;
    }, _ => {
      // fallback: count unique speaker names from events (if events contain speakers)
      const speakerSet = new Set<string>();
      (this.events || []).forEach(ev => {
        if (Array.isArray(ev.speakers)) ev.speakers.forEach((s: any) => speakerSet.add(s));
      });
      this.totalSpeakers = speakerSet.size;
    });

    // tickets endpoint optional - if you keep ticket sales there:
    this.http.get<any[]>('http://localhost:3000/tickets').subscribe(tickets => {
      this.tickets = tickets || [];
      this.ticketsSold = this.tickets.reduce((sum, t) => sum + (t.quantity || 1), 0);
      this.createOrUpdateCharts();
    }, _ => {
      // fallback: estimate tickets from guests length
      this.ticketsSold = this.guests.length;
      this.createOrUpdateCharts();
    });
  }

  private createOrUpdateCharts() {
    // ensure view children exist
    if (!this.trafficChartRef || !this.ticketsChartRef) return;

    // Traffic chart: visitors by source — mock from events/guests
    const labels = ['Direct', 'Email', 'Social', 'Other'];
    const values = [
      Math.round(this.totalRegistrations * 0.3) || 10,
      Math.round(this.totalRegistrations * 0.25) || 5,
      Math.round(this.totalRegistrations * 0.3) || 8,
      Math.round(this.totalRegistrations * 0.15) || 2
    ];

    if (this.trafficChart) {
      this.trafficChart.data.labels = labels;
      (this.trafficChart.data.datasets![0].data as number[]) = values;
      this.trafficChart.update();
    } else {
      this.trafficChart = new Chart(this.trafficChartRef.nativeElement.getContext('2d')!, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: ['#ef4444','#f97316','#10b981','#60a5fa']
          }]
        },
        options: {
          plugins: {
            legend: { position: 'bottom', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#111' } }
          }
        }
      });
    }

    // Tickets sold over last 6 events (bar)
    const evLabels = (this.events.slice(-6).map(e => e.name || e.title) || []).reverse();
    const soldValues = (this.events.slice(-6).map(e => (e.ticketsSold || 0)) || []).reverse();

    // fallback if empty
    const barLabels = evLabels.length ? evLabels : ['Event A','Event B','Event C'];
    const barValues = soldValues.length ? soldValues : [50, 75, 30];

    if (this.ticketsChart) {
      this.ticketsChart.data.labels = barLabels;
      (this.ticketsChart.data.datasets![0].data as number[]) = barValues;
      this.ticketsChart.update();
    } else {
      this.ticketsChart = new Chart(this.ticketsChartRef.nativeElement.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: barLabels,
          datasets: [{
            label: 'Tickets Sold',
            data: barValues,
            backgroundColor: '#7c3aed'
          }]
        },
        options: {
          scales: {
            x: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#111' } },
            y: { ticks: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#111' } }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  // helper for human-friendly date formatting
  formatDate(d: string) {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleDateString();
  }
  getEventName(eventId: number): string {
  const event = this.events.find(e => e.id === eventId);
  return event ? (event.name || event.title || '—') : '—';
}

getEventDate(eventId: number): string {
  const event = this.events.find(e => e.id === eventId);
  return event?.startDate ? this.formatDate(event.startDate) : '—';
}

}
