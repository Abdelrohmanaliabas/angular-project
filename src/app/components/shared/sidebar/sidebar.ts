import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  navLinks = [
    { label: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
    { label: 'Schedule List', icon: 'pi pi-calendar', path: '/schedule' },
    { label: 'Speaker List', icon: 'pi pi-user', path: '/speakers' },
    { label: 'Attendant List', icon: 'pi pi-users', path: '/attendants' },
    { label: 'Upcoming Event', icon: 'pi pi-calendar-plus', path: '/upcoming' },
    { label: 'Calendar', icon: 'pi pi-calendar-times', path: '/calendar' },
    { label: 'Venue', icon: 'pi pi-map-marker', path: '/venue' },
    { label: 'Profile', icon: 'pi pi-user-edit', path: '/profile' },
  ];
}
