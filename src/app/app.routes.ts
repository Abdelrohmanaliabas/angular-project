import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Register } from './auth/register';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Auth },
  { path: 'register', component: Register },
];
