import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventsService, EventWithRelations } from '../../../core/services/events.service';
import { FeedbackService, FeedbackModel } from '../../../core/services/feedback.service';

@Component({
  selector: 'app-guest-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './guest-feedback.html',
  styleUrls: ['./guest-feedback.css']
})
export class GuestFeedbackComponent implements OnInit {
  eventId!: number;
  guestId!: number;
  token!: string;

  event?: EventWithRelations;
  rating = 0;
  comment = '';
  loading = true;
  submitted = false;
  alreadySubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const eventIdParam = params.get('eventId');
      const guestIdParam = params.get('guestId');
      const tokenParam = params.get('token');

      if (!eventIdParam || !guestIdParam || !tokenParam) {
        alert('Invalid feedback link.');
        this.router.navigate(['/']);
        return;
      }

      this.eventId = +eventIdParam;
      this.guestId = +guestIdParam;
      this.token = tokenParam;

      this.loadEventAndFeedback();
    });
  }

  loadEventAndFeedback() {
    this.loading = true;
    this.eventsService.getById(String(this.eventId)).subscribe({
      next: (event) => {
        this.event = event;
        this.feedbackService.getByEventAndGuest(this.eventId, this.guestId).subscribe({
          next: (feedbacks) => {
            if (feedbacks.length > 0) {
              this.alreadySubmitted = true;
            }
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      },
      error: () => {
        alert('Event not found.');
        this.router.navigate(['/']);
      }
    });
  }

  setRating(star: number) {
    this.rating = star;
  }

  submitFeedback() {
    if (!this.rating) {
      alert('Please select a rating.');
      return;
    }

    const feedback: FeedbackModel = {
      guestId: this.guestId,
      eventId: this.eventId,
      rating: this.rating,
      comment: this.comment.trim(),
      createdAt: new Date().toISOString()
    };

    this.feedbackService.create(feedback).subscribe({
      next: () => {
        this.submitted = true;
      },
      error: () => {
        alert('Failed to submit feedback.');
      }
    });
  }
}
