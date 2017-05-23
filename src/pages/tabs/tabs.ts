import {Component} from '@angular/core';
import {Tabs, NavParams} from 'ionic-angular'

import {AboutTabPage} from '../about/about-tab.component';
import {FriendsTabPage} from '../friends/friends-tab.component';
import {MomentTabPage} from '../moment/moment-tab.component';
import {ChatTabPage} from '../chat/chat-tab.component';


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {

  tab0Root = ChatTabPage;
  tab1Root = FriendsTabPage;
  tab2Root = MomentTabPage;
  tab3Root = AboutTabPage;

  selected: number = 0;
  public tabId: number;
  
  constructor(public params: NavParams) {
    this.tabId = params.get("tabId");
    if(this.tabId != undefined || this.tabId !=null) {
      this.selected = this.tabId;
    }
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
