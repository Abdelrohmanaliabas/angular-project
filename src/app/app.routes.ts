import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Register } from './auth/register';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Auth },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
];
