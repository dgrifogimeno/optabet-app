import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'optabet-app';
  tabs: string[] = ["../../../assets/images/hogar.png", "../../../assets/images/investigacion.png", "../../../assets/images/configuraciones.png"];
  activeTab: number = 0;

  constructor() {}

  showTabInfo(t: number) {
    this.activeTab = t;
  }
}
