import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
// =============================
// 🧩 النماذج Models
// =============================
export interface EventModel {
  id: number;
  title: string;
  description: string;
  categoryId: string;
  location: string;
  startDate: string; // ISO format
  endDate: string;   // ISO format
  createdBy: string;
  status: string;
  eventImage?: string;
}

export interface CommentModel {
  id: string ;
  eventId: number;
  user_id?: number;
  comment: string;
}

export interface FeedbackModel {
  id: string ;
  guestId: string ;
  eventId: string ;
  rating: number;
  comment?: string;
  createdAt?: string;
}

// Event مع العلاقات
export interface EventWithRelations extends EventModel {
  comments?: CommentModel[];
  feedback?: FeedbackModel[];
}

// =============================
// 🧠 الخدمة الرئيسية EventsService
// =============================
@Injectable({ providedIn: 'root' })
export class EventsService {
  private base = 'http://localhost:3000/events';

  constructor(private http: HttpClient) {}

  // 📦 إحضار جميع الأحداث
  list(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.base);
  }

  // 📦 إحضار جميع الأحداث مع العلاقات (feedback + comments)
  listWithRelations(): Observable<EventWithRelations[]> {
    return this.http.get<any[]>('http://localhost:3000/events').pipe(
      switchMap(events => {
        return this.http.get<any[]>('http://localhost:3000/feedback').pipe(
          map(feedbacks => {
            // اربط كل فيدباك بالحدث المناسب
            return events.map(event => ({
              ...event,
              feedback: feedbacks.filter(f => f.eventId == event.id) // لاحظ == مش ===
            }));
          })
        );
      })
    );
  }

  // 🔍 إحضار حدث واحد بالتفاصيل
  getById(id: string): Observable<any> {
    const eventUrl = `${this.base}/${id}`;
    const feedbackUrl = `http://localhost:3000/feedback?eventId=${id}`;

    return forkJoin({
      event: this.http.get<any>(eventUrl),
      feedback: this.http.get<any[]>(feedbackUrl)
    }).pipe(
      map(({ event, feedback }) => ({
        ...event,
        feedback
      }))
    );
  }

  // 👤 إحضار الأحداث الخاصة بمستخدم محدد
  listByUser(userId: number): Observable<EventModel[]> {
    const url = `${this.base}?createdBy=${userId}`;
    return this.http.get<EventModel[]>(url);
  }

  // 🆕 إنشاء حدث جديد
  create(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.base, event);
  }

  // ✏️ تعديل حدث
  update(id: number, event: Partial<EventModel>): Observable<EventModel> {
    return this.http.patch<EventModel>(`${this.base}/${id}`, event);
  }

  // ❌ حذف حدث
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
