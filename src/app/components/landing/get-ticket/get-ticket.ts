import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-get-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './get-ticket.html',
})
export class GetTicket implements OnInit {
  ticketForm!: FormGroup;
  events: any[] = [];
  formMessage = '';
  loading = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(010|011|012|015)\d{8}$/),
        ],
      ],
      eventId: [null, Validators.required],
    });

    this.http.get('http://localhost:3000/events').subscribe((data: any) => {
      this.events = data;
    });
  }

  onSubmit() {
    if (this.ticketForm.invalid) return;

    this.loading = true;
    const formData = this.ticketForm.value;
    const eventId = Number(formData.eventId);

    if (!eventId || isNaN(eventId)) {
      this.formMessage = 'Please select a valid event.';
      this.loading = false;
      return;
    }

    this.http
      .get<any[]>(`http://localhost:3000/guests?email=${formData.email}&eventId=${eventId}`)
      .subscribe((existingGuests) => {
        if (existingGuests.length > 0) {
          this.formMessage = 'You have already reserved this event!';
          this.loading = false;
          return;
        }

        const newGuest = {
          id: Math.random().toString(36).substring(2, 8),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          status: 'Invited',
          eventId: eventId,
        };

        this.http.post('http://localhost:3000/guests', newGuest).subscribe(() => {
          this.formMessage = 'Your ticket has been reserved successfully!';
          this.loading = false;
          this.ticketForm.reset();
        });
      });
  }
}
