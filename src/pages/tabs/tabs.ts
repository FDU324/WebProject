import {Component, Injectable, ViewChild} from '@angular/core';
import {Tabs} from 'ionic-angular'

import {AboutPage} from '../about/about';
import {FriendsPage} from '../friends/friends';
import {MomentPage} from '../moment/moment';
import {ChatPage} from '../chat/chat';

import {TabSwitchService} from '../../service/tabSwitch'

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab0Root = ChatPage;
  tab1Root = FriendsPage;
  tab2Root = MomentPage;
  tab3Root = AboutPage;

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
