import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Events } from '../../../../services/events';
import { AuthService } from '../../../../core/services/auth.service';

export interface EventModel {
  title: string;
  details: string;
  images: string[];
  startDate: string;
  endDate: string;
  time: string;
  address: string;
  categoryId: number | null;
  status: string;
  seat: string;
  speakername: string;
  email: string;
  phone: string;
  designation: string;
  createdBy?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-event-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-creation.html',
  styleUrls: ['./event-creation.css'],
})
export class EventCreation implements OnInit {
  event: EventModel = {
    title: '',
    details: '',
    images: [],
    startDate: '',
    endDate: '',
    time: '',
    address: '',
    categoryId: null,
    status: '',
    seat: '',
    speakername: '',
    email: '',
    phone: '',
    designation: '',
    createdBy: undefined,
  };

  eventCategories: any[] = [];
  id!: number;
  isEditMode = false;

  constructor(
    private eventService: Events,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to access this page.');
      this.router.navigate(['/login']);
      return;
    }

    this.eventService.getEventCategories().subscribe((data) => {
      this.eventCategories = data;
    });

    this.route.paramMap.subscribe((params) => {
      const idparam = params.get('id');
      if (idparam) {
        this.isEditMode = true;
        this.id = +idparam;
        this.eventService.getEvent(this.id).subscribe((data) => {
          this.event = data;
        });
      }
    });
  }

  onImageChange(event: Event, field: keyof typeof this.event, multiple: boolean = false) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);

    if (multiple) {
      this.event[field] = [] as any;
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          (this.event[field] as string[]).push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        this.event[field] = reader.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  removeGalleryImage(index: number) {
    this.event.images.splice(index, 1);
  }

  checkSeatLimit() {
    if (+this.event.seat > 300) {
      alert('Seat count cannot exceed 300');
      this.event.seat = '300';
    }
  }

  // Called when either startDate or endDate changes
  onDateChange() {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);

    if (this.event.startDate && this.event.endDate && end < start) {
      alert('End date cannot be before start date.');
      this.event.endDate = this.event.startDate;
    }

    this.updateStatusBasedOnDate();
  }

  // Automatically update status based on startDate
  updateStatusBasedOnDate() {
    if (!this.event.startDate) return;

    const now = new Date();
    const start = new Date(this.event.startDate);

    now.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    if (start > now) {
      this.event.status = 'Upcoming';
    } else if (start.getTime() === now.getTime()) {
      this.event.status = 'Inprogress';
    } else {
      this.event.status = 'Completed';
    }
  }

  submitForm() {
    const user = this.authService.getUser();

    if (!user || !user.id) {
      alert('You must be logged in to create an event.');
      return;
    }

    this.event.createdBy = user.id;

    this.updateStatusBasedOnDate(); // ensure status is correct before saving

    if (this.isEditMode) {
      this.eventService.updateEvent(this.id, this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
