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
  sessionList: Session[];   // 所有聊天内容，一个元素对应一个好友会话
  localUser: User;        // 当前的玩家

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              localUserService: LocalUserService,
              public chatService: ChatService
              ) {
    // TODO:这里currentUser应该从navParams中初始化
    this.localUser = localUserService.getLocalUser();
    this.sessionList = chatService.getSessionList();
  }


  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    this.appCtrl.getRootNav().push(SessionPage, {
      localUser: this.localUser,
      session: this.chatService.getSession(friend)
    });


  }


}
