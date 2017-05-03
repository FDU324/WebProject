import {Component} from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';

import {User} from "../../entities/user";
import {Session} from '../../entities/session';
import {SessionPage} from './session.component';

import {LocalUserService} from '../../service/local-user.service';
import {ChatService} from '../../service/chat.service';

@Component({
  selector: 'page-chat-tab',
  templateUrl: 'chat-tab.component.html',
})
export class ChatTabPage {
  lastSessionList: Session[];   // 所有聊天内容，一个元素对应一个好友会话
  localUser: User;        // 当前的玩家

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              localUserService: LocalUserService,
              public chatService: ChatService
              ) {
    this.localUser = localUserService.getLocalUser();
    this.lastSessionList = chatService.getLastSessionList();
  }

  ionViewWillEnter() {
    this.lastSessionList = this.chatService.getLastSessionList();
  }

  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    this.appCtrl.getRootNav().push(SessionPage, {
      localUser: this.localUser,
      friend: friend
    });
  }


}
