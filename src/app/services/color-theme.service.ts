import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  lightMode = false;

  switchTheme(){
    this.lightMode = !this.lightMode
    document.documentElement.setAttribute('data-theme',this.lightMode ? 'light' : 'dark');
  }
  constructor() { }
}
