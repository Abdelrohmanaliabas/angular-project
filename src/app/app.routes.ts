import { Routes } from '@angular/router';

import { Auth } from './auth/auth';
import { Register } from './auth/register';
import { Dashboard } from './components/dashboard/dashboard';
import { GetTicket } from './landing/get-ticket/get-ticket';
import { Home } from './landing/home/home';
import { About } from './landing/about/about';
import { Speakers } from './landing/speakers/speakers';
import { Schedule } from './landing/schedule/schedule';
import { Blog } from './landing/blog/blog';

import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
      { path: 'login', component: Auth },
      { path: 'register', component: Register },
      { path: 'dashboard', component: Dashboard },
      { path: 'schedule', component: Schedule },
      { path: 'get-ticket', component: GetTicket },
      {
        path: '',
        component: MainLayout,
        children: [
          { path: '', component: Home },
          { path: 'home', component: Home },
          { path: 'get-ticket', component: GetTicket },
          { path: 'about', component: About },
          { path: 'speakers', component: Speakers },
          { path: 'schedule', component: Schedule },
          { path: 'blog', component: Blog },
        ],
      },
      { path: '**', redirectTo: '' },
];
