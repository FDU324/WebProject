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
    this.observers  = [];
    this.sessionList = [];
    this.totalNewMessageCount = 0;
    this.receiverOn();
  }

  // sessions
  receiverOn() {
    
    // 添加50个模拟的好友及其聊天内容

    
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

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }

  update() {
      this.observers.forEach(item => item.update());
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
    
    let sendData = {
      from: this.localUser.username,
      to: friend.username,
      message: message
    }

    return this.socketService.emitPromise('sendMessage', JSON.stringify(sendData)).then((data)=>{
      if (data === 'success') {
        let temSession = this.sessionList.find((item) => item.friend.username === friend.username);
        if (temSession === undefined) {
          let newSession = new Session(friend, [message], 0);
          temSession = newSession;
          this.sessionList.unshift(newSession);
        } else {
          temSession.messageList.push(message);
        }
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

  clearNewMessages(session: Session) {
    this.totalNewMessageCount -= session.newMessageCount;
    session.newMessageCount = 0;
  }


}
