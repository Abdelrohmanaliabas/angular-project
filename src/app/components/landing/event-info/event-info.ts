import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventsService } from '../../../core/services/events.service';
@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-info.html',
  styleUrls: ['./event-info.css']
})
export class EventInfo {
  event$!: Observable<any>;

  constructor(private route: ActivatedRoute, private eventsService: EventsService) {}

  ngOnInit() {
    this.event$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.eventsService.getById(id);
      })
    );
  }
}
