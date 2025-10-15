import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppToggletheme } from '../../../layout/component/app-toggletheme/app-toggletheme';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,AppToggletheme],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() isDarkMode = false;
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Output() darkModeToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  toggleDarkMode() {
    this.darkModeToggled.emit();
  }

}
