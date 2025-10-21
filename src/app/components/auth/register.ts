import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../core/services/auth.service';
import { AppFloatingconfigurator } from '../shared/app.floatingconfigurator/app.floatingconfigurator';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    ButtonModule, 
    InputTextModule, 
    PasswordModule, 
    RippleModule,
    AppFloatingconfigurator,
    RouterModule,
    CommonModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './register.html',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmpassword = '';
  verificationCode = '';
  generatedCode = '';
  step: 'form' | 'verify' = 'form';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  sendVerificationCode() {
    if (!this.validateInputs()) return;

    this.loading = true;

    fetch(`http://localhost:3000/users?email=${this.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          this.loading = false;
          this.messageService.add({
            severity: 'warn',
            summary: 'Email Exists',
            detail: 'This email is already registered. Please use another email or sign in.',
          });
          return;
        }

        this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

        const templateParams = {
          to_email: this.email,
          subject: 'Email Verification Code',
          message: `Your verification code is: ${this.generatedCode}`,
        };

        emailjs
          .send('service_2zkpunt', 'template_k9jr8j9', templateParams, '6SCuP-X4rdUdtYhaX')
          .then(() => {
            this.loading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Code Sent',
              detail: 'A verification code has been sent to your email.',
            });
            this.step = 'verify';
          })
          .catch(() => {
            this.loading = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to send verification email. Try again later.',
            });
          });
      })
      .catch(() => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Unable to connect to server.',
        });
      });
  }

  verifyCode() {
    if (this.verificationCode === this.generatedCode) {
      this.registerUser();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Code',
        detail: 'The verification code you entered is incorrect.',
      });
    }
  }

  registerUser() {
    const newUser = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 90)}.jpg`,
      role: 'user',
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'Your account has been created successfully!',
        });
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Failed to register user. Try again later.',
        });
      },
    });
  }

  validateInputs(): boolean {
    if (!this.name || !this.email || !this.password || !this.confirmpassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Please fill in all fields.',
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Email',
        detail: 'Please enter a valid email address.',
      });
      return false;
    }

    if (this.password.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Weak Password',
        detail: 'Password must be at least 6 characters.',
      });
      return false;
    }

    if (this.password !== this.confirmpassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Password Mismatch',
        detail: 'Passwords do not match.',
      });
      return false;
    }

    return true;
  }

}
