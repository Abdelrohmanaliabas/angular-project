import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventModel {
  id: number;
  name: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  createdBy: number;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  private base = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  list(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.base);
  }

  listByUser(userId: number): Observable<EventModel[]> {
    const params = new HttpParams().set('createdBy', userId.toString());
    return this.http.get<EventModel[]>(this.base, { params });
  }

  getById(id: number): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.base}/${id}`);
  }

  create(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.base, event);
  }

  update(id: number, event: Partial<EventModel>): Observable<EventModel> {
    return this.http.patch<EventModel>(`${this.base}/${id}`, event);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
