import {Injectable} from '@angular/core';

import {User} from '../entities/user';
import {Message} from '../entities/message';
import {Session} from '../entities/session';

import {LocalUserService} from './local-user.service'

@Injectable()
export class ChatService {
  localUser: User;
  sessionList: Session[];

  constructor(public localUserService: LocalUserService) {

    this.localUser = localUserService.getLocalUser();
    this.initializeChats();
  }

  // 初始化所有chats
  initializeChats() {
    this.sessionList = [];
    // 添加50个模拟的好友及其聊天内容
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i, 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');

      // 添加50条模拟的聊天记录
      let messages = [];
      for (let j = 0; j < 25; j++) {
        let messageFrom = new Message('friend','text', j + '--sdfadsf,fadgasadfasdfasfdadfasdfadsfafassfafdasdfasdfa' +
          'asdfadsfadfadfadfasfasfasdfafdadsfadsfadfsafafagsdfgdghfhgjfhgnbsdfgsdgaf' +
          'asdfadgfhldsfng;iahng;auighliasudhfaiu;sgbha;iufh;uiahg', new Date().toLocaleString());

        let messageTo = new Message('me','text', j + '--sdfadsffadga', new Date().toLocaleString());

        messages.push(messageFrom);
        messages.push(messageTo);
      }

      let temSession = new Session(friend, messages);
      this.sessionList.push(temSession);
    }

  }

  getSessionList() {
    return this.sessionList;
  }

  getSession(friend: User) {
    return this.sessionList.filter((item) => {
      return (item['friend'].nickname.toLowerCase() === friend.nickname.toLowerCase());
    })[0];
  }


}
