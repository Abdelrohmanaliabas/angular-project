import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskModel {
  id: number;
  eventId: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  deadline: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private base = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  list(eventId?: number): Observable<TaskModel[]> {
    const url = eventId ? `${this.base}?eventId=${eventId}` : this.base;
    return this.http.get<TaskModel[]>(url);
  }

  create(task: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.base, task);
  }

  update(id: number | string, data: Partial<TaskModel>): Observable<TaskModel> {
    return this.http.patch<TaskModel>(`${this.base}/${id}`, data);
  }

  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
