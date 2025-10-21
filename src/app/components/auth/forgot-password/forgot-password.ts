import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AppFloatingconfigurator } from '../../shared/app.floatingconfigurator/app.floatingconfigurator';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    FloatLabelModule,
    AppFloatingconfigurator,
    RouterModule
  ],
  providers: [MessageService],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  step: 'email' | 'verify' | 'reset' = 'email';

  email = '';
  verificationCode = '';
  generatedCode = '';
  newPassword = '';
  confirmPassword = '';

  private apiUrl = 'http://localhost:3000/users';

  constructor(
    private messageService: MessageService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  // 1️⃣ إرسال كود التحقق
  sendVerificationCode() {
    if (!this.email) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter your email address.'
      });
      return;
    }

    // نتحقق أولاً إن المستخدم موجود في الـ JSON server
    this.http.get<any[]>(`${this.apiUrl}?email=${this.email}`).subscribe({
      next: (users) => {
        if (!users.length) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email not found in our records.'
          });
          return;
        }

        // إنشاء كود التحقق
        this.generatedCode = Math.floor(100000 + Math.random() * 900000).toString();

        const templateParams = {
          to_email: this.email,
          subject: 'Password Reset Code',
          message: `Your password reset code is: ${this.generatedCode}`
        };

        // إرسال الإيميل باستخدام EmailJS
        emailjs
          .send('service_2zkpunt', 'template_k9jr8j9', templateParams, '6SCuP-X4rdUdtYhaX')
          .then(() => {
            this.messageService.add({
              severity: 'success',
              summary: 'Code Sent',
              detail: 'Check your email inbox for the verification code.'
            });
            this.step = 'verify';
          })
          .catch(() => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to send verification code. Please try again.'
            });
          });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Server Error',
          detail: 'Unable to connect to the server.'
        });
      }
    });
  }

  // 2️⃣ التحقق من الكود
  verifyCode() {
    if (this.verificationCode.trim() === this.generatedCode.trim()) {
      this.step = 'reset';
      this.messageService.add({
        severity: 'success',
        summary: 'Verified',
        detail: 'Code verified successfully.'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid Code',
        detail: 'The code you entered is incorrect.'
      });
    }
  }

  // 3️⃣ إعادة تعيين كلمة المرور
  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Mismatch',
        detail: 'Passwords do not match.'
      });
      return;
    }

    // تحديث كلمة المرور
    this.auth.updatePassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password updated successfully!'
        });
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update password.'
        });
      }
    });
  }
}
