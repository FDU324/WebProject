import {Component} from '@angular/core';
import {NavController, NavParams, App, ToastController} from 'ionic-angular';

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
  localUser: User;        // 当前的用户

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public toastCtrl: ToastController,
              public localUserService: LocalUserService,
              public chatService: ChatService) {
    this.localUser = localUserService.getLocalUser();
    this.lastSessionList = chatService.getLastSessionList();
  }

  ionViewDidEnter() {
    this.lastSessionList = this.chatService.getLastSessionList();
    // console.log('enter chat tab!');
    /*
     for (let session of this.lastSessionList) {
     console.log(session.newMessageCount);
     }
     */
    this.chatService.registerPage(this);
  }

  ionViewDidLeave() {
    this.chatService.removePage(this);
  }

  update() {
    this.lastSessionList = this.chatService.getLastSessionList();
  }

  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    this.chatService.clearNewMessages(friend);
    this.appCtrl.getRootNav().push(ChatSessionPage, {
      localUser: this.localUser,
      friend: friend
    });
  }

  deleteSession(session: Session) {
    this.chatService.deleteSession(session).then(data => {
      console.log(data);
      if (data === 'success') {
        this.update();
        // console.log(this.lastSessionList);
      } else {
        let toast = this.toastCtrl.create({
          message: '删除失败，请重试',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
      }
    });
  }


}
