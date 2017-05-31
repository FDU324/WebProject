import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../entities/user';
import {SocketService} from "./socket.service";


@Injectable()
export class FriendListService {
  friendList: User[];
  friendReqList: User[];


  constructor(public http: Http,
              public socketService: SocketService) {
    this.friendList = [];
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i,  'assets/icon/favicon.ico', '北京市-北京市-东城区');
      this.friendList.push(friend);
    }
    this.friendReqList = [];
  }

  getFriendList() {
    return this.friendList;
  }

  searchUser(myUsername, friendUsername) {
    let url = 'http://localhost:3000/user/findUser?myUsername=' + myUsername + '&friendUsername=' + friendUsername;
    return this.http.get(url).toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          // 可以添加
          let tem = {
            myUsername: myUsername,
            friendUsername: friendUsername
          };
          return this.socketService.emitPromise('newFriendApply', JSON.stringify(tem)).then(data => {
            return Promise.resolve('success');
          });
        } else if (res.json().data === 'friend') {
          // 已经是好友
          return Promise.resolve('friend');
        } else if (res.json().data === 'notExist') {
          // 该好友不存在
          return Promise.resolve('notExist');
        } else {
          // 服务器错误
          console.log('FriendListService-searchUser:', res.json().data);
          return Promise.resolve('FriendListService-searchUser:');
        }

      }).catch(error => {
        console.log(error);
        return Promise.resolve('FriendListService-searchUser:');
      });
  }

  getFriendReqList() {
    return this.friendReqList;
  }

  getReqCount() {
    return this.friendReqList.length;
  }

  acceptRequest(friend: User) {
    //TODO: 接受好友请求
    for(let i=0; i<this.friendReqList.length; i++) {
      if(this.friendReqList[i].username === friend.username) {
        this.friendReqList.splice(i, 1);
        break;
      }
    }
  }

}
