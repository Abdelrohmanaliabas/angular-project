import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFloatingconfigurator } from '../../../layout/component/app.floatingconfigurator/app.floatingconfigurator';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,AppFloatingconfigurator],
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
