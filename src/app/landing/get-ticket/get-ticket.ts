import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-get-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './get-ticket.html',
  styleUrl: './get-ticket.css'
})
export class GetTicket {
  ticketForm: FormGroup;
  formMessage = '';

  constructor(private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      ticketType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      const formData = this.ticketForm.value;
      console.log('Ticket form submitted:', formData);

      this.formMessage = `🎉 Thank you ${formData.name}! Your ${formData.ticketType} ticket has been reserved.`;
      this.ticketForm.reset();
    }
  }
}