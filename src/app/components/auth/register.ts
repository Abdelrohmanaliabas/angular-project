import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../core/services/auth.service';
import { AppFloatingconfigurator } from '../shared/app.floatingconfigurator/app.floatingconfigurator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, PasswordModule, RippleModule,AppFloatingconfigurator,RouterModule],
  templateUrl: './register.html',
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmpassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password || !this.confirmpassword) {
      alert('Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmpassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.register(newUser).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Error connecting to the server');
      }
    });
  }
}
