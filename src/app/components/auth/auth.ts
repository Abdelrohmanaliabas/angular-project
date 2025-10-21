import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppFloatingconfigurator } from '../shared/app.floatingconfigurator/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [
    ButtonModule, 
    CheckboxModule, 
    InputTextModule, 
    PasswordModule, 
    FormsModule, 
    RouterModule, 
    RippleModule,
    AppFloatingconfigurator,
    CommonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onLogin() {
    if (!this.email.trim() || !this.password.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Missing Fields',
        detail: 'Please enter both email and password.',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Email',
        detail: 'Please enter a valid email address.',
      });
      return;
    }

    if (this.password.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Weak Password',
        detail: 'Password must be at least 6 characters long.',
      });
      return;
    }

    this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Welcome!',
          detail: `Welcome back, ${user.name}!`,
        });

        setTimeout(() => {
          const role = user.role || 'user';
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Login Failed',
          detail: 'Invalid email or password. Please try again.',
        });
        console.error('Login error:', err);
      },
    });
  }
}
