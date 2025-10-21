import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../../../services/events';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css'],
  imports:[CommonModule ,FormsModule]
})
export class EventDetails implements OnInit {
  eventId: string = '';
  event: any;

  constructor(private route: ActivatedRoute, private eventsService: Events) {}

 eventCategories: any[] = [];

ngOnInit(): void {
  this.eventId = this.route.snapshot.paramMap.get('id') || '';
  if (this.eventId) {
    this.loadEventDetails(this.eventId);
  }

  // Load categories
  this.eventsService.getEventCategories().subscribe({
    next: (categories) => {
      this.eventCategories = categories;

      // If event is already loaded
      if (this.event?.categoryId) {
        this.setCategoryName();
      }
    }
  });
}


  loadEventDetails(id: string): void {
    this.eventsService.getEvent(id).subscribe({
      next: (eventData) => {
        this.event = eventData;
         this.setCategoryName();
      },
      error: (err) => {
        console.error('Failed to load event', err);
      },
    });
  }

  setCategoryName() {
  if (this.event && this.event.categoryId && this.eventCategories.length > 0) {
    const category = this.eventCategories.find(cat => +cat.id === +this.event.categoryId);
    if (category) {
      this.event.categoryName = category.name;
    }
  }
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
