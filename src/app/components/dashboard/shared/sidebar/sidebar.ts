import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {
  @Input() collapsed = false;
  isMobile = false;

  navLinks = [
    { label: 'Dashboard', icon: 'pi pi-home', path: 'home' },
    { label: 'Speaker List', icon: 'pi pi-user', path: 'speakers' },
    { label: 'Guest List', icon: 'pi pi-users', path: 'guests' },
    { label: 'Events', icon: 'pi pi-calendar-plus', path: 'event-list' },
    { label: 'Feedback', icon: 'pi pi-user-edit', path: 'feedback' },
    { label: 'Tasks List', icon: 'pi pi-calendar', path: 'tasks' },
    { label: 'Expenses', icon: 'pi pi-calendar', path: 'expenses' },
    { label: 'Calendar', icon: 'pi pi-calendar-times', path: 'calendar' },
    { label: 'Profile', icon: 'pi pi-user-edit', path: 'profile' },
  ];

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.onResize();
  }
}
