import { Routes } from '@angular/router';
import { LandingPage } from './landing/landing-page/landing-page';
import { GetTicket } from './landing/get-ticket/get-ticket';

export const routes: Routes = [
    {
        path: '',
        component: LandingPage
    },
    {
        path: 'get-ticket',
        component: GetTicket
    }
];
