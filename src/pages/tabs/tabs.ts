import {Component} from '@angular/core';
import {Tabs, NavParams} from 'ionic-angular'

import {AboutTabPage} from '../about/about-tab.component';
import {FriendsTabPage} from '../friends/friends-tab.component';
import {MomentTabPage} from '../moment/moment-tab.component';
import {ChatTabPage} from '../chat/chat-tab.component';

import {ChatService} from '../../service/chat.service'
import {FriendListService} from '../../service/friend-list.service'
import {MomentService} from '../../service/moment.service'


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

  totalNewMessageCount: number = 0;
  totalNewMomentCount: number = 0;
  friendReqCount: number = 0;
  
  constructor(public params: NavParams,
              public chatService: ChatService,
              public friendListService: FriendListService,
              public momentService: MomentService
              ) {
    this.tabId = params.get("tabId");
    if(this.tabId != undefined || this.tabId !=null) {
      this.selected = this.tabId;
    }
  }

  ionViewDidLoad() {
    this.chatService.registerPage(this);
    this.friendListService.registerPage(this);
  }

  
  ionViewCanEnter() {
    this.totalNewMessageCount = this.chatService.getTotalNewMessageCount();
    this.friendReqCount = this.friendListService.getReqCount();
    this.totalNewMomentCount = this.momentService.getNewMomentCount();

    
  }

  update() {
    this.totalNewMessageCount = this.chatService.getTotalNewMessageCount();
    this.friendReqCount = this.friendListService.getReqCount();
    this.totalNewMomentCount = this.momentService.getNewMomentCount();

  }

   

}
