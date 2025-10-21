import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  id: string | number;
  eventId: number;
  user_id?: number;
  comment: string;
}

export interface FeedbackModel {
  id: string | number;
  guestId: number;
  eventId: number;
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
    const url = `${this.base}?_embed=comments&_embed=feedback`;
    return this.http.get<EventWithRelations[]>(url);
  }

  // 🔍 إحضار حدث واحد بالتفاصيل
  getById(id: string): Observable<EventWithRelations> {
    const url = `${this.base}/${id}?_embed=comments&_embed=feedback`;
    return this.http.get<EventWithRelations>(url);
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
