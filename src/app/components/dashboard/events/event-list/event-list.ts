import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Events } from '../../../../services/events';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user || !user.id) {
      alert('You must be logged in to view your events.');
      this.router.navigate(['/login']);
      return;
    }
    this.currentUserId = user.id;
    this.loadCategoriesAndEvents();
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
                const category = this.categories.find((cat) => cat.id === event.categoryId);
                return {
                  ...event,
                  categoryName: category ? category.name : 'Unknown',
                };
              });
            this.filteredEvents = [...this.events];
          },
          error: (err) => {
            console.error('Failed to fetch events:', err);
          },
        });
      },
      error: (err) => {
        console.error('Failed to fetch categories:', err);
      },
    });
  }
  applyFilters(): void {
    this.filteredEvents = this.events.filter((event) => {
      const matchesSearch =
        this.searchTerm === '' || event.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory =
        this.selectedCategoryName === '' || event.categoryName === this.selectedCategoryName;
      const matchesStatus = this.selectedStatus === '' || event.status === this.selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }
  confirmDelete(id: number): void {
    
    // Find the event by id
    const eventToDelete = this.events.find((event) => event.id === id);
    if (!eventToDelete) {
      alert('Event not found.');
      return;
    }
    if (eventToDelete.status === 'Completed') {
      alert('Cannot delete an event with status "Completed".');
      return;
    }
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (confirmed) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          alert('Event deleted successfully.');
          // Reload events after deletion to refresh list
          this.loadCategoriesAndEvents();
        },
        error: () => {
          alert('Failed to delete the event.');
        },
      });
    }
  }
  updateEvent(id: number): void {
    this.router.navigate(['/dashboard/event-edit', id]);
  }
}
