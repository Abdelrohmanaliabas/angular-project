import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../../core/services/layout.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-toggletheme',
  imports: [CommonModule, ButtonModule],
  templateUrl: './app-toggletheme.html'
})
export class AppToggletheme {
  layoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.layoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }
}
