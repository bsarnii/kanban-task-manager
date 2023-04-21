import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  constructor() { }

  lightMode = false;

  switchTheme(){
    this.lightMode = !this.lightMode;
    this.setTheme(JSON.stringify(this.lightMode));
    document.documentElement.setAttribute('data-theme',this.lightMode ? 'light' : 'dark');
  }

  setTheme(themeMode:string){
    localStorage.setItem("lightMode", themeMode)
  }
  getTheme(){
    this.lightMode = JSON.parse(localStorage['lightMode'])
    document.documentElement.setAttribute('data-theme',this.lightMode ? 'light' : 'dark');
  }

}
