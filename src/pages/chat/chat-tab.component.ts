import {Component} from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';

import {User} from "../../entities/user";
import {Session} from '../../entities/session';
import {ChatSessionPage} from './chat-session.component';

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
              public localUserService: LocalUserService,
              public chatService: ChatService) {
    this.localUser = localUserService.getLocalUser();
    this.lastSessionList = chatService.getLastSessionList();
  }

  ionViewDidEnter() {
    this.lastSessionList = this.chatService.getLastSessionList();
    console.log('enter chat tab!');
  }

  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    this.appCtrl.getRootNav().push(ChatSessionPage, {
      localUser: this.localUser,
      friend: friend
    });
  }

  deleteSession(session: Session) {
    //TODO:从本地缓存中删除聊天记录
    console.log('delete session');
  }


}
