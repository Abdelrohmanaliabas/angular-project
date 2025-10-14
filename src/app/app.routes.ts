import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Register } from './auth/register';
import { Dashboard } from './components/dashboard/dashboard';
import { LandingPage } from './landing/landing-page/landing-page';
import { GetTicket } from './landing/get-ticket/get-ticket';
export const routes: Routes = [
      { path: 'login', component: Auth },
  { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard },
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'get-ticket',
        component: GetTicket
    }
];
