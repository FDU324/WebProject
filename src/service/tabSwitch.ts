import { Injectable } from '@angular/core';
import {Tabs} from 'ionic-angular';

@Injectable()
export class TabSwitchService {
  tabs: Tabs;

  constructor() {
  }

  
  bindTabs(tabs: Tabs) {
    this.tabs = tabs;
    //console.log(this.tabs);
  }

  switchTab(selected: number) {

    //console.log(this.tabs);
    this.tabs.select(selected);
  }
}