import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventModel {
  id: string | number;
  name: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private base = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  list(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.base);
  }
}
