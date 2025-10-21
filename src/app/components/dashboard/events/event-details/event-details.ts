import { Component ,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Events } from '../../../../services/events';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
// import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails implements OnInit {
  event: any = null;
  categoryName: string = '';
  showInviteModal = false;
  inviteEmail = '';
  inviteMsg = '';

  constructor(private route: ActivatedRoute, private eventService: Events) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const eventId = +idParam;
      this.loadEvent(eventId);
    }
  }

  loadEvent(id: number) {
    this.eventService.getEvent(id).subscribe((eventData) => {
      this.event = eventData;

      // Fetch category name
      this.eventService.getEventCategories().subscribe((categories) => {
        const matched = categories.find((cat: any) => cat.id === eventData.categoryId);
        this.categoryName = matched ? matched.name : 'Unknown';
      });
    });
  }

  // Email Invite Modal Logic
  openInviteModal() {
    this.showInviteModal = true;
  }

  closeInviteModal() {
    this.showInviteModal = false;
  }

  sendInviteEmail() {
    if (!this.inviteEmail || !this.inviteMsg) {
      alert('Please enter both email and message.');
      return;
    }

    const templateParams = {
      to_email: this.inviteEmail,
      message: this.inviteMsg,
      event_title: this.event.title,
    };

    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then(
        (response: EmailJSResponseStatus) => {
          alert('Invitation sent successfully!');
          this.closeInviteModal();
          this.inviteEmail = '';
          this.inviteMsg = '';
        },
        (err) => {
          alert('Failed to send invitation, please try again.');
          console.error(err);
        }
      );
  }
}
