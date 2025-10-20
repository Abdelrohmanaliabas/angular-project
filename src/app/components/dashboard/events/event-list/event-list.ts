import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Events } from '../../../../services/events';

@Component({
  selector: 'app-event-list',
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];
  categories: any[] = [];

  searchTerm: string = '';
  selectedCategoryName: string = '';
  selectedStatus: string = '';
  statuses: string[] = ['Upcoming', 'Ongoing', 'Completed'];

  constructor(private eventService: Events, private router: Router) {}

  ngOnInit(): void {
    this.loadCategoriesAndEvents();
  }

  /**
   * Fetch both categories and events
   */
  loadCategoriesAndEvents(): void {
    this.eventService.getEventCategories().subscribe({
      next: (categoriesRes) => {
        this.categories = categoriesRes;

        // After categories are loaded, fetch events
        this.eventService.getEvents().subscribe({
          next: (eventsRes) => {
            // Replace categoryId with actual category name
            this.events = eventsRes.map((event: any) => {
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

  /**
   * Filter events by search, category name, and status
   */
  applyFilters(): void {
    this.filteredEvents = this.events.filter((event) => {
      const matchesSearch =
        this.searchTerm === '' ||
        event.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategoryName === '' ||
        event.categoryName === this.selectedCategoryName;

      const matchesStatus =
        this.selectedStatus === '' || event.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  deleteEvent(id: number) {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadCategoriesAndEvents(); // reload after delete
    });
  }

  updateEvent(id: number) {
    this.router.navigate(['/dashboard/event-edit', id]);
  }
}
