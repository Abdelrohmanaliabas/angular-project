import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsService, EventWithRelations } from '../../../core/services/events.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';
interface BlogPostVM {
  id: number;        // ✅ مضاف
  title: string;
  date: string;
  comments: number;
  image: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class Blog {
  posts$!: Observable<BlogPostVM[]>;

  constructor(private events: EventsService) {
    this.posts$ = this.events.listWithRelations().pipe(
      map((items: EventWithRelations[]) =>
        items
          .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
          .map(ev => ({
            id: ev.id, // ✅ أضف الـ id هنا
            title: ev.title,
            date: this.formatDate(ev.startDate),
            comments: ev.comments?.length ?? 0,
            image: ev.eventImage ?? 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800'
          }))
      ),
      catchError(err => {
        console.error('Failed to load posts', err);
        return of([] as BlogPostVM[]);
      })
    );
  }

  private formatDate(iso: string): string {
    const d = new Date(iso);
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  }
}
