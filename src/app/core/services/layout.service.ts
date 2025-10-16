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
  private readonly THEME_KEY = 'app-theme';

  private _config: LayoutConfig = {
    darkTheme: localStorage.getItem(this.THEME_KEY) === 'dark',
    primaryColor: 'emerald'
  };

  layoutConfig = signal<LayoutConfig>(this._config);

  configUpdate = new Subject<LayoutConfig>();
  configUpdate$ = this.configUpdate.asObservable();

  isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  primaryColor = computed(() => this.layoutConfig().primaryColor);

  constructor() {
    effect(() => {
      const config = this.layoutConfig();
      this.applyTheme(config);
      this.configUpdate.next(config);
    });
  }

  private applyTheme(config: LayoutConfig) {
    const root = document.documentElement;

    if (config.darkTheme) {
      root.classList.add('app-dark', 'dark');
      localStorage.setItem(this.THEME_KEY, 'dark');
    } else {
      root.classList.remove('app-dark', 'dark');
      localStorage.setItem(this.THEME_KEY, 'light');
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
