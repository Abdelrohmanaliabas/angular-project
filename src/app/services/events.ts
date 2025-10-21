import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCreation } from '../components/dashboard/events/event-creation/event-creation';

@Injectable({
  providedIn: 'root',
})
export class Events {
  private apiUrl = 'http://localhost:3000/events';
  private categoriesUrl = 'http://localhost:3000/event_categories';
  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  getEvent(id: number|string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  addEvent(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  updateEvent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getEventsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?createdBy=${userId}`);
  }
  getEventCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }
}
