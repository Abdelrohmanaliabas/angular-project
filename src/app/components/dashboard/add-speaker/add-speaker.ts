import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-speaker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-speaker.html' ,
})
export class AddSpeaker {
  speaker = {
    name: '',
    email: '',
    bio: '',
    avatar: '',
    designation: '',
    organization: '',
  };

  isSubmitting = false;
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  addSpeaker() {
    if (!this.speaker.name || !this.speaker.email) {
      this.message = 'Name and Email are required.';
      return;
    }
    this.isSubmitting = true;
    this.http.post('http://localhost:3000/speaker', this.speaker).subscribe({
      next: () => {
        this.message = '✅ Speaker added successfully!';
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/dashboard/speakers']), 1000);
      },
      error: () => {
        this.message = '❌ Failed to add speaker. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}
