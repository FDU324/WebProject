import { Injectable } from '@angular/core';

import {User} from '../user';

import {LocalUserService } from './localUser'

@Injectable()
export class ChatListService {
  localUser: User;
  chatList: Object[];

  constructor(public localUserService: LocalUserService) {

    this.localUser = localUserService.getLocalUser();
    this.initializeChats();
  }

  // 初始化所有chats
  initializeChats() {
    this.chatList = [];
    // 添加50个模拟的好友及其聊天内容
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i, 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');

      // 添加50条模拟的聊天记录
      let chats = [];
      for (let j = 0; j < 25; j++) {
        let chatFrom = {
          from: friend,
          to: this.localUser,
          content: j + '--sdfadsf,fadgasadfasdfasfdadfasdfadsfafassfafdasdfasdfa' +
          'asdfadsfadfadfadfasfasfasdfafdadsfadsfadfsafafagsdfgdghfhgjfhgnbsdfgsdgaf' +
          'asdfadgfhldsfng;iahng;auighliasudhfaiu;sgbha;iufh;uiahg',
          time: new Date().toLocaleString(),
        };
        let chatTo = {
          from: this.localUser,
          to: friend,
          content: j + '--sdfadsffadga',
          time: new Date().toLocaleString(),
        };
        chats.push(chatFrom);
        chats.push(chatTo);
      }

      let temFriendChat = {
        user: friend,
        chats: chats
      };

      this.chatList.push(temFriendChat);
    }

    //console.log(this.chatList);

  }

  getChatList() { 
    return this.chatList; 
  }

  getChat(friend: User) {
    let chat: Object;
    chat = this.chatList.filter((item) => {
        return (item['user'].nickname.toLowerCase() === friend.nickname.toLowerCase());
      })

      //console.log(chat);

      return chat[0];
  }
}