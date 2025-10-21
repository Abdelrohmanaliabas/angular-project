import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Events } from '../../../../services/events';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './event-list.html',
  styleUrls: ['./event-list.css'],
})
export class EventList implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  categories: any[] = [];
  searchTerm: string = '';
  selectedCategoryName: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Upcoming', 'Inprogress', 'Completed'];
  currentUserId!: number;

  constructor(
    private eventService: Events,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user || !user.id) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Access Denied',
        detail: 'You must be logged in to view your events.',
      });
      this.router.navigate(['/login']);
      return;
    }

    this.currentUserId = user.id;
    this.loadCategoriesAndEvents();
  }

  loadCategoriesAndEvents(): void {
    this.eventService.getEventCategories().subscribe({
      next: (categoriesRes) => {
        this.categories = categoriesRes;
        this.eventService.getEvents().subscribe({
          next: (eventsRes) => {
            this.events = eventsRes
              .filter((event: any) => event.createdBy === this.currentUserId)
              .map((event: any) => {
                const category = this.categories.find(
                  (cat) => cat.id === event.categoryId
                );
                return {
                  ...event,
                  categoryName: category ? category.name : 'Unknown',
                };
              });
            this.filteredEvents = [...this.events];
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to fetch events.',
            });
          },
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch categories.',
        });
      },
    });
  }

  applyFilters(): void {
    const searchLower = this.searchTerm.toLowerCase();

    this.filteredEvents = this.events.filter((event) => {
      const matchesSearch =
        this.searchTerm === '' ||
        event.title?.toLowerCase().includes(searchLower) ||
        event.speakername?.toLowerCase().includes(searchLower) ||
        event.status?.toLowerCase().includes(searchLower) ||
        event.address?.toLowerCase().includes(searchLower);

      const matchesCategory =
        this.selectedCategoryName === '' ||
        event.categoryName === this.selectedCategoryName;

      const matchesStatus =
        this.selectedStatus === '' || event.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  confirmDelete(id: number): void {
    const eventToDelete = this.events.find((event) => event.id === id);
    if (!eventToDelete) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Found',
        detail: 'Event not found.',
      });
      return;
    }

    if (eventToDelete.status === 'Completed') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Not Allowed',
        detail: 'Cannot delete a completed event.',
      });
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${eventToDelete.title}"?`,
      header: 'Confirm Deletion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, Delete',
      rejectLabel: 'Cancel',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.eventService.deleteEvent(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Deleted',
              detail: 'Event deleted successfully!',
            });
            this.loadCategoriesAndEvents();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete the event.',
            });
          },
        });
      },
    });
  }

  updateEvent(id: number): void {
    this.router.navigate(['/dashboard/event-edit', id]);
  }
}
