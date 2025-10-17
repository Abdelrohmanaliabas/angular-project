import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GuestModel {
  id: number | string;
  name: string;
  email: string;
  status: string;
  eventId?: number;
}

@Injectable({ providedIn: 'root' })
export class GuestsService {
  private base = 'http://localhost:3000/guests';

  constructor(private http: HttpClient) {}

  list(page = 1, limit = 10, q?: string): Observable<{ data: GuestModel[]; total: number }> {
    return this.http.get<GuestModel[]>(this.base).pipe(
      map((data) => {
        if (q && q.trim()) {
          const term = q.trim().toLowerCase();
          data = data.filter(item => item.name.toLowerCase().includes(term));
        }

        const total = data.length;

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginated = data.slice(start, end);

        return { data: paginated, total };
      })
    );
  }



  delete(id: number | string) {
    return this.http.delete(`${this.base}/${id}`);
  }
  update(id: number | string, data: Partial<GuestModel>) {
    return this.http.patch(`${this.base}/${id}`, data);
  }
}
