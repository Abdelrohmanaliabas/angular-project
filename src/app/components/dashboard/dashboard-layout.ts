import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './shared/sidebar/sidebar';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { FeedbackMailService } from '../../core/services/feedback-mail.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, Navbar, Footer],
  templateUrl: './dashboard-layout.html',
  styleUrls: ['./dashboard-layout.css']
})
export class Dashboard {
  sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  constructor(private feedbackMailService: FeedbackMailService) {}

  async ngOnInit() {
    await this.feedbackMailService.sendFeedbackLinksForCompletedEvents();
  }
}
