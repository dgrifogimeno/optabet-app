import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

  @Input() tabOptions: string[] = [];
  @Output() onTabChange = new EventEmitter<number>();
  activeTab: number = 1;

  constructor() {}

  changeTab(i:number) {
    this.activeTab = i;
    this.onTabChange.emit(this.activeTab);
  }
}
