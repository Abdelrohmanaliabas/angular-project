import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ToastModule, ButtonModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{
  user: any = null;
  originalEmail = '';
  editing = false;
  loading = false;
  previewUrl: string | ArrayBuffer | null = null;
  base64Avatar: string | null = null;

  constructor(private http: HttpClient, private messageService: MessageService) {}

  ngOnInit() {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.user = JSON.parse(userData);
      this.originalEmail = this.user.email;
    }
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  onAvatarSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.previewUrl = base64String;
      this.user.avatar = base64String; 
    };
    reader.readAsDataURL(file);
  }

  saveChanges() {
    if (!this.user.name || !this.user.email) {
      this.showToast('warn', 'Missing Fields', 'Please fill all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.showToast('warn', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^(010|011|012|015)\d{8}$/;
    if (this.user.phone && !phoneRegex.test(this.user.phone)) {
      this.showToast(
        'warn',
        'Invalid Phone',
        'Phone must start with 010, 011, 012, or 015 and be 11 digits.'
      );
      return;
    }

    this.loading = true;

    if (this.user.email !== this.originalEmail) {
      this.http
        .get<any[]>(`http://localhost:3000/users?email=${this.user.email}`)
        .subscribe((res) => {
          if (res.length > 0) {
            this.loading = false;
            this.showToast('error', 'Email Exists', 'This email is already registered.');
          } else {
            this.updateProfile();
          }
        });
    } else {
      this.updateProfile();
    }
  }

  updateProfile() {
    this.http.patch(`http://localhost:3000/users/${this.user.id}`, this.user).subscribe({
      next: () => {
        localStorage.setItem('user_data', JSON.stringify(this.user));
        this.loading = false;
        this.editing = false;
        this.showToast('success', 'Profile Updated', 'Your profile has been saved successfully!');
      },
      error: () => {
        this.loading = false;
        this.showToast('error', 'Update Failed', 'An error occurred while saving.');
      },
    });
  }

  
  private showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
