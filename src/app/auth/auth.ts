import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingconfigurator } from '../layout/component/app.floatingconfigurator/app.floatingconfigurator';
import { AuthService } from './auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (users) => {
        console.log('Login response:', users);
        if (users && users.length > 0) {
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid email or password');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Error connecting to server');
      }
    });
  }
}
