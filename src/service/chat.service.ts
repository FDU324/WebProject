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
    this.initializeSissions();
  }

  // sessions
  initializeSissions() {
    this.sessionList = [];
    // 添加50个模拟的好友及其聊天内容
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i, 'sdfadsfas', 'assets/icon/favicon.ico', '中国大陆');

      // 添加50条模拟的聊天记录
      let messages = [];
      for (let j = 0; j < 25; j++) {
        let messageFrom = new Message('friend', 'text', j + '--sdfadsf,fadgasadfasdfasfdadfasdfadsfafassfafdasdfasdfa' +
          'asdfadsfadfadfadfasfasfasdfafdadsfadsfadfsafafagsdfgdghfhgjfhgnbsdfgsdgaf' +
          'asdfadgfhldsfng;iahng;auighliasudhfaiu;sgbha;iufh;uiahg', new Date().toLocaleString());

        let messageTo = new Message('me', 'text', j + '--sdfadsffadga', new Date().toLocaleString());

        messages.push(messageFrom);
        messages.push(messageTo);
      }

      let temSession = new Session(friend, messages);
      this.sessionList.push(temSession);
    }

  }

  getSession(friend: User) {
    return this.sessionList.find((item) => item.friend.username === friend.username);
  }

  getLastSessionList() {
    let temList = this.sessionList.map((item, index, array) => {
      return new Session(item.friend, item.messageList.slice(-1));
    });

    const compare = (a, b) => {
      return new Date(b.messageList[0].time).getTime() - new Date(a.messageList[0].time).getTime();
    };

    return temList.sort(compare);
  }

  sendMessage(friend: User, type: string, content) {
    let message = new Message('me', type, content, new Date().toLocaleString());

    //console.log(content);
    //console.log(this.sessionList);
    //console.log(friend);
    let temSession = this.sessionList.find((item) => item.friend.username === friend.username);
    if (temSession === undefined) {
      let newSession = new Session(friend, [message]);
      temSession = newSession;
      this.sessionList.unshift(newSession);
    } else {
      temSession.messageList.push(message);
    }
    return Promise.resolve(temSession);
  }

  sendImg(friend: User, url: string) {
    //TODO: 这里将本地图片路径上传到服务器，得到该图片在服务器的路径
    return this.sendMessage(friend, 'images', url);
  }


}
