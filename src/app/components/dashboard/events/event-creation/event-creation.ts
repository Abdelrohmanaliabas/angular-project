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
          this.event = { ...data, categoryId: +data.categoryId };
        });
      }
    });
  }
  onImageChange(event: Event, field: keyof typeof this.event, multiple: boolean = false) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const files = Array.from(input.files);
    if (multiple) {
      //  Limit total images to max 2
      const totalImages = this.event.images.length + files.length;
      if (totalImages > 2) {
        alert('You can upload a maximum of 2 images.');
        return;
      }
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
    const seatNumber = +this.event.seat;
    if (seatNumber > 300) {
      alert('Seat count cannot exceed 300');
      this.event.seat = '300';
    }
    if (seatNumber < 1) {
      alert('Seat count cannot be less than 1');
      this.event.seat = '1';
    }
  }
  onDateChange() {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);
    if (this.event.startDate && this.event.endDate && end < start) {
      alert('End date cannot be before start date.');
      this.event.endDate = this.event.startDate;
    }
    this.updateStatusBasedOnDate();
  }
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
  validateEmail(email: string): boolean {
    // Simple regex for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  validateForm(): boolean {
    // Check all required fields not empty
    const requiredFields = [
      'title',
      'details',
      'startDate',
      'endDate',
      'time',
      'address',
      'categoryId',
      'seat',
      'speakername',
      'email',
      'phone',
      'designation',
    ];
    for (const field of requiredFields) {
      if (
        this.event[field] === null ||
        this.event[field] === undefined ||
        (typeof this.event[field] === 'string' && this.event[field].trim() === '') ||
        (field === 'categoryId' && this.event.categoryId === null)
      ) {
        alert(`Please fill out the ${field} field.`);
        return false;
      }
    }
    // Title min length 5
    if (this.event.title.trim().length < 5) {
      alert('Event title must be at least 5 characters long.');
      return false;
    }
    // Speaker name min length 3
    if (this.event.speakername.trim().length < 3) {
      alert('Speaker name must be at least 3 characters long.');
      return false;
    }
    // Validate email
    if (!this.validateEmail(this.event.email.trim())) {
      alert('Please enter a valid email address.');
      return false;
    }
    // Images max 2
    if (this.event.images.length > 2) {
      alert('You can upload a maximum of 2 images.');
      return false;
    }
    // Seat max 300 (also min 1)
    const seatNumber = +this.event.seat;
    if (seatNumber > 300) {
      alert('Seat count cannot exceed 300.');
      return false;
    }
    if (seatNumber < 1) {
      alert('Seat count cannot be less than 1.');
      return false;
    }
    return true;
  }
  submitForm() {
    if (!this.validateForm()) {
      return;
    }
    const user = this.authService.getUser();
    if (!user || !user.id) {
      alert('You must be logged in to create an event.');
      return;
    }
    this.event.createdBy = user.id;
    this.updateStatusBasedOnDate();
    // ensure status is correct before saving
    if (this.isEditMode) {
      this.eventService.updateEvent(this.id, this.event).subscribe(() => {
        this.router.navigate(['/dashboard/event-list']);
      });
    } else {
      this.eventService.addEvent(this.event).subscribe(() => {
        this.router.navigate(['/dashboard/event-list']);
      });
    }
  }
}
