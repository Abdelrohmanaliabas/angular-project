import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppToggletheme } from '../../../shared/app-toggletheme/app-toggletheme';
@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AppToggletheme],
  templateUrl: './landing-navbar.html',
  styleUrls: ['./landing-navbar.css'],
})
export class LandingNavbar {
  isDarkMode = false;
  isMenuOpen = false;
  isLoggedIn = false;
  constructor(private router: Router) {
    const token = localStorage.getItem('auth_token');
    this.isLoggedIn = !!token;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('dark', this.isDarkMode);
  }

  navigate() {
    if (this.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
