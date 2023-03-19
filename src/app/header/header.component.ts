import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() lightmode:boolean = false;
  logo = this.lightmode ? "assets/logo-dark.svg" : "assets/logo-light.svg";
}
