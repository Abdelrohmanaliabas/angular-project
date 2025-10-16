import { Component, computed, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../../core/services/layout.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-floatingconfigurator',
  imports: [CommonModule, ButtonModule, StyleClassModule],
  templateUrl: './app.floatingconfigurator.html'
})
export class AppFloatingconfigurator {
   LayoutService = inject(LayoutService);

    float = input<boolean>(true);

    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

}
