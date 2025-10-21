import { Component, OnInit } from '@angular/core';
import { GuestsService, GuestModel } from '../../../core/services/guests.service';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EventsService } from '../../../core/services/events.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-attend-list',
  standalone: true,
  imports: [
    CommonModule,
    SelectModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './attend-list.html',
  styleUrl: './attend-list.css'
})
export class AttendList implements OnInit {
  attendees: GuestModel[] = [];
  eventsMap: Record<string, string> = {};
  userEventIds: number[] = [];

  loading = false;
  page = 1;
  limit = 6;
  total = 0;
  q = '';

  showDialog = false;
  selectedAttendant: GuestModel | null = null;
  newStatus = '';

  constructor(
    private guestsService: GuestsService,
    private eventsService: EventsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUserEvents();
  }

  loadUserEvents() {
    const userData = localStorage.getItem('user_data');
    if (!userData) return;

    const user = JSON.parse(userData);
    if (!user || !user.id) return;

    this.eventsService.listByUser(user.id).subscribe({
      next: (events: any[]) => {
        this.userEventIds = events.map(e => Number(e.id));
        events.forEach((e) => (this.eventsMap[String(e.id)] = e.title));
        this.load();
      },
      error: (err) => console.error(err)
    });
  }

  load(page = this.page) {
    this.loading = true;
    this.guestsService.list(page, this.limit, this.q, this.userEventIds).subscribe({
      next: (res) => {
        this.attendees = res.data;
        this.total = res.total;
        this.page = page;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  getEventName(att: GuestModel): string {
    const key = att.eventId ? String(att.eventId) : '';
    return this.eventsMap[key] ?? 'Unknown Event';
  }

  onSearch(term: string) {
    this.q = term;
    this.page = 1;
    this.load(1);
  }

  confirmDelete(att: GuestModel) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete guest "${att.name}"?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        this.loading = true;
        this.guestsService.delete(att.id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: `Guest "${att.name}" deleted successfully!`,
            });
            this.load(this.page);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete guest.',
            });
            this.loading = false;
          },
        });
      },
    });
  }

  openEdit(att: GuestModel) {
    if (att.status === 'Declined') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Allowed',
        detail: 'You cannot modify a Declined guest.',
      });
      return;
    }

    this.selectedAttendant = { ...att };
    this.newStatus = att.status;
    this.showDialog = true;
  }

  saveStatus() {
    if (!this.selectedAttendant) return;

    const oldStatus = this.selectedAttendant.status;
    const newStatus = this.newStatus;

    if (oldStatus === 'Confirmed' && newStatus !== 'Confirmed') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Allowed',
        detail: 'You cannot revert a Confirmed guest to another status.',
      });
      return;
    }

    if (oldStatus === 'Declined') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Allowed',
        detail: 'You cannot update a Declined guest.',
      });
      return;
    }

    const updated = { ...this.selectedAttendant, status: newStatus };

    this.guestsService.update(updated.id, updated).subscribe({
      next: () => {
        if (newStatus === 'Confirmed') {
          this.sendConfirmationEmail(updated);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Guest status updated successfully!',
        });

        this.showDialog = false;
        this.load(this.page);
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update guest.',
        }),
    });
  }

  sendConfirmationEmail(guest: GuestModel) {
    const eventName =
      guest.eventId && this.eventsMap[String(guest.eventId)]
        ? this.eventsMap[String(guest.eventId)]
        : 'an event';

    const templateParams = {
      to_name: guest.name,
      to_email: guest.email,
      event_name: eventName,
      subject: `🎉 You're Invited to ${eventName}!`,
      from_name: 'Event Management Team',
      time: new Date().toLocaleString(),
      message: `
        Hi ${guest.name},
        We are thrilled to invite you to <b>${eventName}! 🎊
        This event will be an unforgettable experience full of learning, networking, and inspiration.
        Please confirm your attendance soon — we look forward to seeing you!
        Best regards,Event Management Team
      `,
    };

    emailjs
      .send('service_2zkpunt', 'template_k9jr8j9', templateParams, '6SCuP-X4rdUdtYhaX')
      .then(
        () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Email Sent',
            detail: `Confirmation email sent to ${guest.email}`,
          });
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Email Failed',
            detail: 'Could not send the confirmation email.',
          });
          console.error('Email sending failed:', err);
        }
      );
  }

  closeDialog() {
    this.showDialog = false;
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.total / this.limit));
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.load(p);
  }
}
