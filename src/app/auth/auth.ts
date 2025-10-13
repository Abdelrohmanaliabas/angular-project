import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingconfigurator } from '../layout/component/app.floatingconfigurator/app.floatingconfigurator';

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
}
