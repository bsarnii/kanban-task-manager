import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
lightmode = false;

modeToggle(){
  this.lightmode = !this.lightmode;
  document.documentElement.setAttribute('data-theme',this.lightmode ? 'light' : 'dark');
}
}
