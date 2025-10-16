import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingconfigurator } from '../shared/app.floatingconfigurator/app.floatingconfigurator';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,AppFloatingconfigurator],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class Auth {
  email: string = '';
  password: string = '';
  checked: boolean = false;
  loading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password.');
      return;
    }
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        alert(`Welcome ${user.name}!`);
        const role = user.role || 'user';
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Invalid email or password.');
        this.loading = false;
      },
    });
  }
}
