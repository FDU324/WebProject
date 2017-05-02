import {Component, Injectable, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular'

import {AboutTabPage} from '../about/about-tab.component';
import {FriendsTabPage} from '../friends/friends-tab.component';
import {MomentTabPage} from '../moment/moment-tab.component';
import {ChatTabPage} from '../chat/chat-tab.component';

import {TabSwitchService} from '../../service/tab-switch.service'

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab0Root = ChatTabPage;
  tab1Root = FriendsTabPage;
  tab2Root = MomentTabPage;
  tab3Root = AboutTabPage;

  selected: number = 0;

  @ViewChild('myTabs') tabs: Tabs;

  constructor(public tabSwitchService: TabSwitchService) {

  }

  // 页面加载完成后，将tabs与tabSwitchService中的tabs对象绑定
  ionViewDidLoad() {
    this.tabSwitchService.bindTabs(this.tabs);
    //console.log(this.tabs);
  }

  /*
   ionViewCanEnter() {

   this.selected = this.tabSwitchService.getSelected();
   //console.log('enter tabs'+this.selected);
   this.tabs.select(this.selected);
   }

   ionViewCanLeave() {
   //console.log('leave tabs'+this.selected);
   this.tabSwitchService.setSelected(this.selected);
   }
   */

}
