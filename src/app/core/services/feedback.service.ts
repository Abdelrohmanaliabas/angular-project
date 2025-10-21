import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeedbackModel {
  id?: number | string;
  guestId: number | string;
  eventId: number | string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private base = 'http://localhost:3000/feedback';

  constructor(private http: HttpClient) {}

  // 🆕 إنشاء فيدباك جديد
  create(feedback: FeedbackModel): Observable<FeedbackModel> {
    return this.http.post<FeedbackModel>(this.base, feedback);
  }

  // 📦 جلب كل الفيدباكات (اختياري)
  list(): Observable<FeedbackModel[]> {
    return this.http.get<FeedbackModel[]>(this.base);
  }

  // 🔍 جلب فيدباك معين بناءً على eventId + guestId
  getByEventAndGuest(eventId: number, guestId: number): Observable<FeedbackModel[]> {
    return this.http.get<FeedbackModel[]>(`${this.base}?eventId=${eventId}&guestId=${guestId}`);
  }
}
