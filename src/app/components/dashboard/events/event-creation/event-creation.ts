import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Events } from '../../../../services/events';
import { AuthService } from '../../../../core/services/auth.service';

interface EventModel {
  title: string;
  details: string;
  images: string[]; // multiple images as base64 strings
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

    // Fetch event categories
    this.eventService.getEventCategories().subscribe((data) => {
      this.eventCategories = data;
    });

    // Check if edit mode
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

  //  Convert selected images to base64 and store in event object
  onImageChange(event: Event, field: keyof typeof this.event, multiple: boolean = false) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);

    if (multiple) {
      this.event[field] = [] as any; // clear previous images
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

  // removing images
  removeGalleryImage(index: number) {
    this.event.images.splice(index, 1);
  }

  // Limit seat count to 300 max
  checkSeatLimit() {
    if (+this.event.seat > 300) {
      alert('Seat count cannot exceed 300');
      this.event.seat = '300';
    }
  }

  // Submit form data to JSON server
  submitForm() {
    const user = this.authService.getUser();

    if (!user || !user.id) {
      alert('You must be logged in to create an event.');
      return;
    }

    this.event.createdBy = user.id;

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
