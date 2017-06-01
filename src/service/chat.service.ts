import {Injectable} from '@angular/core';

import {User} from '../entities/user';
import {Message} from '../entities/message';
import {Session} from '../entities/session';

import {LocalUserService} from './local-user.service'
import {SocketService} from './socket.service'
import {FriendListService} from './friend-list.service'

@Injectable()
export class ChatService {
  localUser: User;
  sessionList: Session[];

  totalNewMessageCount: number;

  observers: any[];


  constructor(public localUserService: LocalUserService, public socketService: SocketService, public friendListService: FriendListService) {
    this.localUser = localUserService.getLocalUser();
    this.initializeSissions();
  }

  // sessions
  initializeSissions() {
    this.observers  = [];
    this.sessionList = [];
    // 添加50个模拟的好友及其聊天内容
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i, 'assets/icon/favicon.ico', '北京市-北京市-东城区', []);
    }

    this.totalNewMessageCount = 0;
/*
>>>>>>> origin/master
      let friend = new User('username--0', 'fake--0', 'assets/icon/favicon.ico', '北京市-北京市-东城区');

      // 添加50条模拟的聊天记录
      let messages = [];
      for (let j = 0; j < 25; j++) {
        let messageFrom = new Message('friend', 'text', j + '--sdfadsf,fadgasadfasdfasfdadfasdfadsfafassfafdasdfasdfa' +
          'asdfadsfadfadfadfasfasfasdfafdadsfadsfadfsafafagsdfgdghfhgjfhgnbsdfgsdgaf' +
          'asdfadgfhldsfng;iahng;auighliasudhfaiu;sgbha;iufh;uiahg', Date.now());

        let messageTo = new Message('me', 'text', j + '--sdfadsffadga', Date.now());

        messages.push(messageFrom);
        messages.push(messageTo);
      }

      let temSession = new Session(friend, messages,3);
      //this.sessionList.push(temSession);
      //this.totalNewMessageCount += temSession.newMessageCount;

      friend = new User('username--1', 'fake--1', 'assets/icon/favicon.ico', '北京市-北京市-东城区');

      // 添加50条模拟的聊天记录
       messages = [];
      for (let j = 0; j < 25; j++) {
        let messageFrom = new Message('friend', 'text', j + '--sdfadsf,fadgasadfasdfasfdadfasdfadsfafassfafdasdfasdfa' +
          'asdfadsfadfadfadfasfasfasdfafdadsfadsfadfsafafagsdfgdghfhgjfhgnbsdfgsdgaf' +
          'asdfadgfhldsfng;iahng;auighliasudhfaiu;sgbha;iufh;uiahg', Date.now());

        let messageTo = new Message('me', 'text', j + '--sdfadsffadga', Date.now());

        messages.push(messageFrom);
        messages.push(messageTo);
      }

      temSession = new Session(friend, messages,1);
      //this.sessionList.push(temSession);
      //this.totalNewMessageCount += temSession.newMessageCount;

*/
      this.socketService.getSocket().on('receiveMessage', (data)=>{
          let jsonData = JSON.parse(data);
          let temSession = this.sessionList.find((item) => item.friend.username === jsonData['from']);
          if (temSession === undefined) {
            let friend = this.friendListService.getFriendList().find(item => item.username === jsonData['from']);
            jsonData['message'].from = 'friend';
            let newSession = new Session(friend, [jsonData['message']], 1);
            temSession = newSession;
            this.sessionList.unshift(newSession);
          }
          else {
            jsonData['message'].from = 'friend';
            temSession.messageList.push(jsonData['message']);
            temSession.newMessageCount++;
          }
          this.totalNewMessageCount++;
          this.update();
      })

  }

  registerComponent(component: any) {
    this.observers.push(component);
    //component.log('register!');
  }

  removeComponent(component: any) {
    this.observers.splice(this.observers.indexOf(component), 1);
    //component.log('remove!');
  }

  update() {
      this.observers.forEach(item=> item.update());
  }

  getSession(friend: User) {
    return this.sessionList.find((item) => item.friend.username === friend.username);
  }

  getLastSessionList() {
    let temList = this.sessionList.map((item, index, array) => {
      return new Session(item.friend, item.messageList.slice(-1), item.newMessageCount);
    });

    const compare = (a, b) => {
      return b.messageList[0].time - a.messageList[0].time;
    };

    return temList.sort(compare);
  }

  sendMessage(friend: User, type: string, content) {
    let message = new Message('me', type, content, Date.now());

    //console.log(content);
    //console.log(this.sessionList);
    //console.log(friend);
    let temSession = this.sessionList.find((item) => item.friend.username === friend.username);
    if (temSession === undefined) {
      let newSession = new Session(friend, [message], 0);
      temSession = newSession;
      this.sessionList.unshift(newSession);
    } else {
      temSession.messageList.push(message);
    }
    let data = {
      from: this.localUser.username,
      to: friend.username,
      message: message
    }

    return this.socketService.emitPromise('sendMessage', JSON.stringify(data)).then((data)=>{
        if (data === 'success') {
            return Promise.resolve(temSession);
        }
        return Promise.resolve('SendMessage-error');
    }).catch(error => {
        console.log('SendMessage-error:', error);
        return Promise.resolve('SendMessage-error');
    });
    //return Promise.resolve(temSession);
  }





  sendImg(friend: User, url: string) {
    //TODO: 这里将本地图片路径上传到服务器，得到该图片在服务器的路径
    return this.sendMessage(friend, 'images', url);
  }

  getTotalNewMessageCount() {
    return this.totalNewMessageCount;
  }

  clearNewMessages(friend: User) {
    for(let session of this.sessionList) {
      if(session.friend.username === friend.username) {
        this.totalNewMessageCount -= session.newMessageCount;
        session.newMessageCount = 0;
        break;
      }
    }

  }


}
