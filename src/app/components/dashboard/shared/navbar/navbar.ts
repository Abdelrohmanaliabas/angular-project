import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToggletheme } from '../../../shared/app-toggletheme/app-toggletheme';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,AppToggletheme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Output() toggleSidebarEvent = new EventEmitter<void>();

  showNotifications = false;
  showMessages = false;
  showUserMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  user: { name: string; avatar: string } = { name: '', avatar: '' };

  ngOnInit() {
    const storedUser = localStorage.getItem('user_data');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.user = {
        name: 'User',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      };
    }
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleDropdown(menu: 'notifications' | 'messages' | 'user') {
    if (
      (menu === 'notifications' && this.showNotifications) ||
      (menu === 'messages' && this.showMessages) ||
      (menu === 'user' && this.showUserMenu)
    ) {
      this.closeAllMenus();
      return;
    }
    this.closeAllMenus();
    if (menu === 'notifications') this.showNotifications = true;
    if (menu === 'messages') this.showMessages = true;
    if (menu === 'user') this.showUserMenu = true;
  }

  closeAllMenus() {
    this.showNotifications = false;
    this.showMessages = false;
    this.showUserMenu = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.closeAllMenus();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
