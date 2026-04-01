import { Injectable } from '@angular/core';
export type ColorTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ColorThemeService {
  colorTheme: ColorTheme = 'light';

  constructor(){
    this.getTheme();
  }

  switchTheme(){
    this.colorTheme = this.colorTheme === 'light' ? 'dark' : 'light';
    this.setTheme(this.colorTheme);
    document.documentElement.setAttribute('data-theme',this.colorTheme);

    //FOR PRIMENG
    if (this.colorTheme === 'dark') {
      document.documentElement.classList.add('my-app-dark');
    } else {
      document.documentElement.classList.remove('my-app-dark');
    }
  }

  setTheme(theme:ColorTheme){
    localStorage.setItem("colorTheme", theme)
  }

  getTheme(){
    const localSotrageTheme = localStorage['colorTheme'];
    if (localSotrageTheme === 'light' || localSotrageTheme === 'dark') {
      this.colorTheme = localSotrageTheme;
    } else {
      this.colorTheme = 'light';
    }
    document.documentElement.setAttribute('data-theme', this.colorTheme);


    //FOR PRIMENG
    if (this.colorTheme === 'dark') {
      document.documentElement.classList.add('my-app-dark');
    } else {
      document.documentElement.classList.remove('my-app-dark');
    }
  }

}
