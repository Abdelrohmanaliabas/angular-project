import { Component, OnInit } from '@angular/core';
import { EventsService, EventWithRelations, FeedbackModel } from '../../../core/services/events.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

interface UserData {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ToastModule
  ],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: { event: EventWithRelations; feedback: FeedbackModel }[] = [];
  loading = true;
  user!: UserData;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.user = JSON.parse(userData);
      this.loadFeedbacks();
    } else {
      this.loading = false;
    }
  }

  loadFeedbacks() {
    this.loading = true;
    this.eventsService.listWithRelations().subscribe({
      next: (events) => {
        const myEvents = events.filter(ev => ev.createdBy === this.user.id);

        this.feedbacks = myEvents.flatMap(ev =>
          (ev.feedback || []).map(f => ({
            event: ev,
            feedback: f
          }))
        );

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
      }
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  getStars(rating: number) {
    const fullStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));
    return fullStars + emptyStars;
  }
}
