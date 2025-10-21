import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../../../services/events';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css'],
  imports:[CommonModule]
})
export class EventDetails implements OnInit {
  eventId: string = '';
  event: any;

  constructor(private route: ActivatedRoute, private eventsService: Events) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') || '';
    if (this.eventId) {
      this.loadEventDetails(this.eventId);
    }
  }

  loadEventDetails(id: string): void {
    this.eventsService.getEvent(id).subscribe({
      next: (eventData) => {
        this.event = eventData;
      },
      error: (err) => {
        console.error('Failed to load event', err);
      },
    });
  }

  // Optional: Function to send event details via email
  sendEmail(): void {
    emailjs
      .send(
        'your_service_id',
        'your_template_id',
        {
          event_name: this.event.name,
          event_description: this.event.description,
          user_email: 'user@example.com', // Replace or bind with form
        },
        'your_user_id'
      )
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('Email sent successfully!', response.status, response.text);
        },
        (error) => {
          console.error('Email sending failed', error);
        }
      );
  }
}
