import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { EventsService } from '../../../../core/services/events.service';
import { GuestsService } from '../../../../core/services/guests.service';
import emailjs from '@emailjs/browser';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.html',
  styleUrls: ['./event-details.css'],
  imports: [CommonModule, FormsModule, DialogModule, ToastModule,RouterModule,ButtonModule],
  providers: [MessageService],
})
export class EventDetails implements OnInit {
  event: any;
  showInviteModal = false;
  inviteEmail = '';
  invitePhone = '';
  loading = false;

  closeDialog() {
    this.showInviteModal = false;
  }

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private guestsService: GuestsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.eventsService.getById(id).subscribe({
      next: (res) => (this.event = res),
      error: (err) => console.error(err)
    });
  }

  openInviteModal() {
    this.showInviteModal = true;
  }

  closeInviteModal() {
    this.showInviteModal = false;
    this.inviteEmail = '';
    this.invitePhone = '';
  }

  sendInviteEmail() {
    if (!this.inviteEmail || !this.invitePhone) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Info',
        detail: 'Please enter both email and phone number.'
      });
      return;
    }

    this.loading = true;

    const guestName = this.inviteEmail.split('@')[0];
    const guest = {
      id: Math.random().toString(36).substring(2, 8),
      name: guestName,
      email: this.inviteEmail,
      phone: this.invitePhone,
      status: 'Confirmed',
      eventId: this.event.id
    };

    const templateParams = {
      to_name: guestName,
      to_email: this.inviteEmail,
      event_name: this.event.title,
      from_name: 'Event Management Team',
      subject: `🎉 You're Confirmed to ${this.event.title}!`,
      message: `
        Hi ${guestName},

        You are invited to <b>${this.event.title}</b> 🎊
        Event Date: ${this.event.startDate} → ${this.event.endDate}
        Location: ${this.event.address}

        We’d love to have you join us!
        Please confirm your attendance soon.

        Best regards,
        <b>Event Management Team</b>
      `
    };

    emailjs
      .send(
        'service_2zkpunt',
        'template_k9jr8j9',
        templateParams,
        '6SCuP-X4rdUdtYhaX'
      )
      .then(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Email Sent',
            detail: `Invitation sent to ${this.inviteEmail}`
          });

          this.guestsService.create(guest).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'info',
                summary: 'Guest Added',
                detail: `${guestName} added to guest list.`
              });
              this.closeInviteModal();
            },
            error: () =>
              this.messageService.add({
                severity: 'error',
                summary: 'Database Error',
                detail: 'Failed to save guest to server.'
              })
          });

          this.loading = false;
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Email Failed',
            detail: 'Could not send the invitation email.'
          });
          console.error(err);
          this.loading = false;
        }
      );
  }
}
