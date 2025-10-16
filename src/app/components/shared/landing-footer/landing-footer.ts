import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-landing-footer',
  imports: [CommonModule],
  templateUrl: './landing-footer.html',
  styleUrl: './landing-footer.css'
})
export class LandingFooter {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
