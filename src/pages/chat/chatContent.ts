/**
 * Created by kadoufall on 2017/4/30.
 */
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Tabs} from 'ionic-angular';

import {User} from "../../user";

import {TabSwitchService} from '../../service/tabSwitch';

@Component({
  selector: 'page-chatContent',
  templateUrl: 'chatContent.html',
})


export class ChatContentPage {
  friendsChat: object;
  currentUser: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public tabSwitchService: TabSwitchService) {
    this.friendsChat = navParams.get('friendsChat');
    this.currentUser = navParams.get('currentUser');

    this.initializeItems();
  }

  initializeItems() {

  }
  
  

  ionViewCanLeave() {
    //console.log("leave chat page");
    this.tabSwitchService.switchTab(0);
    
  }



}
