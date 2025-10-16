import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-landing-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing-navbar.html',
  styleUrl: './landing-navbar.css'
})
export class LandingNavbar {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToTicket() {
    this.router.navigate(['/get-ticket']);
  }
}
