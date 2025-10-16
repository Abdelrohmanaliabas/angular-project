import { Injectable, signal, computed, effect } from '@angular/core';
import { Subject } from 'rxjs';

export interface LayoutConfig {
  darkTheme: boolean;
  primaryColor?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _config: LayoutConfig = {
    darkTheme: false,
    primaryColor: 'emerald'
  };

  layoutConfig = signal<LayoutConfig>(this._config);

  configUpdate = new Subject<LayoutConfig>();
  configUpdate$ = this.configUpdate.asObservable();

  isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  primaryColor = computed(() => this.layoutConfig().primaryColor);

  constructor() {
    // Apply initial theme
    effect(() => {
      const config = this.layoutConfig();
      this.applyTheme(config);
      this.configUpdate.next(config);
    });
  }

  private applyTheme(config: LayoutConfig) {
    if (config.darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  toggleDarkMode() {
    this.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }

  setPrimaryColor(color: string) {
    this.layoutConfig.update((state) => ({
      ...state,
      primaryColor: color
    }));
  }
}
