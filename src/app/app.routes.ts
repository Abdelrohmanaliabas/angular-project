import { Routes } from '@angular/router';
import { Auth } from './components/auth/auth';
import { Register } from './components/auth/register';
import { Dashboard } from './components/dashboard/dashboard-layout';
import { ForgotPassword } from './components/auth/forgot-password/forgot-password';
import { Main } from './components/dashboard/main/main';
import { Schedule as DashboardSchedule } from './components/dashboard/schedule/schedule';
import { SpeakerList as DashboardSpeakers } from './components/dashboard/speaker/speaker-list/speaker-list';
import { AttendList as DashboardAttendants } from './components/dashboard/attend-list/attend-list';
import { TasksList as DashboardTaskList } from './components/dashboard/tasks-list/tasks-list';
import { Calender as DashboardCalendar } from './components/dashboard/calender/calender';
import { Profile as DashboardProfile } from './components/dashboard/profile/profile';
import { EventCreation as DashboardEventCreation} from './components/dashboard/events/event-creation/event-creation';
import { EventDetails as DashboardEventDetails} from './components/dashboard/events/event-details/event-details';
import { EventList as DashboardEventList} from './components/dashboard/events/event-list/event-list';
import { EventExpenses as DashboardExpenses } from './components/dashboard/events/event-expenses/event-expenses';
import { SpeakerInfo as DashboardSpeakerInfo } from './components/dashboard/speaker/speaker-info/speaker-info';
import { FeedbackComponent as DashboardFeedback } from './components/dashboard/feedback/feedback';
import { AddSpeaker } from './components/dashboard/speaker/add-speaker/add-speaker';
import { EditSpeaker } from './components/dashboard/speaker/edit-speaker/edit-speaker';
import { Home } from './components/landing/home/home';
import { About } from './components/landing/about/about';
import { Speakers } from './components/landing/speakers/speakers';
import { Schedule } from './components/landing/schedule/schedule';
import { Blog } from './components/landing/blog/blog';
import { GetTicket } from './components/landing/get-ticket/get-ticket';
import { MainLayout } from './components/landing/main-layout';
import { EventInfo } from './components/landing/event-info/event-info';
import { GuestFeedbackComponent } from './components/landing/guest-feedback/guest-feedback';


// Guards
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { GuestGuard } from './core/guards/guest.guard';


export const routes: Routes = [
  { path: 'login', component: Auth, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },
  { path: 'forgot-password', component: ForgotPassword, canActivate: [GuestGuard] },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Main },
      { path: 'schedule', component: DashboardSchedule },
      { path: 'speakers', component: DashboardSpeakers },
      { path: 'speaker-info/:id', component: DashboardSpeakerInfo },
      { path: 'guests', component: DashboardAttendants },
      { path: 'tasks', component: DashboardTaskList },
      { path: 'expenses', component: DashboardExpenses },
      { path: 'feedback', component: DashboardFeedback },
      { path: 'calendar', component: DashboardCalendar },
      { path: 'profile', component: DashboardProfile },
      { path: 'event-creation' , component: DashboardEventCreation},
      { path: 'event-edit/:id' , component: DashboardEventCreation},
      { path: 'event-list' , component: DashboardEventList},
      { path: 'event-details/:id', component: DashboardEventDetails },
      { path: 'add-speaker', component: AddSpeaker },
      { path: 'edit-speaker/:id', component: EditSpeaker },
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
      { path: 'event/:id', component: EventInfo },
      { path: 'feedback/:eventId/:guestId', component: GuestFeedbackComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
