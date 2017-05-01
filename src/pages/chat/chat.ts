import {Component} from '@angular/core';
import {NavController, NavParams, App} from 'ionic-angular';

import {User} from "../../user";
import {ChatContentPage} from './chatContent';

import {LocalUserService} from '../../service/localUser';
import {ChatListService} from '../../service/chatList';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  friendsChats: object[];   // 所有聊天内容，一个元素对应一个好友
  currentUser: User;        // 当前的玩家

  constructor(public navCtrl: NavController,
              public navParams: NavParams, 
              public appCtrl: App,
              localUserService: LocalUserService, 
              public chatListService: ChatListService
              ) {
    // TODO:这里currentUser应该从navParams中初始化
    this.currentUser = localUserService.getLocalUser();
    this.friendsChats = chatListService.getChatList();
  }


  // 进入和某一好友的聊天页面
  gotoChat(friend) {
    this.appCtrl.getRootNav().push(ChatContentPage, {
      currentUser: this.currentUser,
      friendsChat: this.chatListService.getChat(friend)
    });


  }


}
