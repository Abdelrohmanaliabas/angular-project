import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { EventsService } from '../../../core/services/events.service';
import { HttpClient } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './event-info.html',
  styleUrls: ['./event-info.css']
})
export class EventInfo {
  event$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of({ error: true, message: 'Invalid event ID' });

        return this.eventsService.getById(id).pipe(
          switchMap(event => {
            if (!event || !event.categoryId) return of(event);

            return this.http
              .get<any>(`http://localhost:3000/event_categories/${event.categoryId}`)
              .pipe(
                map(cat => ({
                  ...event,
                  categoryName: cat?.name || 'Uncategorized'
                })),
                catchError(() => of({ ...event, categoryName: 'Unknown Category' }))
              );
          }),
          catchError(err => {
            console.error('Error fetching event:', err);
            return of({ error: true, message: 'Event not found' });
          })
        );
      })
    );
  }

  getStars(rating: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rating ? 1 : 0));
  }
}
