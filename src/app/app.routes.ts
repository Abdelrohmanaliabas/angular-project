import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Register } from './components/auth/register';
import { Dashboard } from './components/dashboard/dashboard-layout';
import { Main } from './components/dashboard/main/main';
import { Schedule as DashboardSchedule } from './components/dashboard/schedule/schedule';
import { SpeakerList as DashboardSpeakers } from './components/dashboard/speaker-list/speaker-list';
import { AttendList as DashboardAttendants } from './components/dashboard/attend-list/attend-list';
import { Calender as DashboardCalendar } from './components/dashboard/calender/calender';
import { Profile as DashboardProfile } from './components/dashboard/profile/profile';


import { Home } from './components/landing/home/home';
import { About } from './components/landing/about/about';
import { Speakers } from './components/landing/speakers/speakers';
import { Schedule } from './components/landing/schedule/schedule';
import { Blog } from './components/landing/blog/blog';
import { GetTicket } from './components/landing/get-ticket/get-ticket';
import { MainLayout } from './components/landing/main-layout';

// Guards
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: Auth },
  { path: 'register', component: Register },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Main },
      { path: 'schedule', component: DashboardSchedule },
      { path: 'speakers', component: DashboardSpeakers },
      { path: 'attendants', component: DashboardAttendants },
      { path: 'calendar', component: DashboardCalendar },
      { path: 'profile', component: DashboardProfile },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () =>
      import('./components/dashboard/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  // Home pages
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
