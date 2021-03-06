import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../entities/user';
import {SocketService} from "./socket.service";
import {LocalUserService} from './local-user.service';
import {MomentService} from "./moment.service";

@Injectable()
export class FriendListService {
  friendList: User[];
  friendReqList: User[];
  newFriendReqCount: number;
  observers: any[];

  constructor(public http: Http,
              public localUserService: LocalUserService,
              public socketService: SocketService,
              public momentService: MomentService) {
  }

  updateAfterLogin() {
    this.friendList = [];
    this.observers = [];
    this.friendReqList = [];
    this.newFriendReqCount = 0;

    this.receiverOn();

    return this.updateFriendList().then(friends => {
      this.friendList = friends;
      console.log('update FriendListService success, ', this.friendList.length);
    });
  }

  receiverOn() {
    this.socketService.getSocket().on('receiveFriendReq', (user) => {
      this.friendReqList.push(JSON.parse(user));
      this.newFriendReqCount++;
      this.update();
    });

    this.socketService.getSocket().on('friendReqAssent', (user) => {
      console.log(JSON.parse(user).nickname, '同意了请求');
      this.friendList.push(JSON.parse(user));
      this.update();
      this.momentService.updateMoment(true);
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

  // 重新从服务器获取好友列表
  updateFriendList() {
    let url = 'http://120.25.238.161:3000/user/getFriends?username=' + this.localUserService.localUser.username;
    return this.http.get(url).toPromise().then(res => {
      if (res.json().data === 'success') {
        this.friendList = JSON.parse(res.json().friends);
        return this.friendList;
      } else {
        // 服务器错误
        console.log('FriendListService-searchUser:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log(error);
      return [];
    });
  }

  // 获得当前的好友列表
  getFriendList() {
    return this.friendList;
  }

  getFriendReqList() {
    return this.friendReqList;
  }

  getNewReqCount() {
    return this.newFriendReqCount;
  }

  acceptRequest(myUsername: string, friend: User) {
    //TODO: 接受好友请求
    this.socketService.emitPromise('acceptFriendReq', JSON.stringify({
      friendUsername: friend.username,
      myUsername: myUsername
    })).then(data => {
      //console.log('data:', data);
      if (data === 'success') {

        this.friendReqList.splice(this.friendReqList.indexOf(friend), 1);
        this.friendList.push(friend);
        this.update();
        this.momentService.updateMoment(true);
      }
      else {
        console.log('添加好友失败');
      }
    }).catch(err => {
      console.log('err:', err);
    })
  }

  clearNewFriendReq() {
    this.newFriendReqCount = 0;
  }

  deleteFriend(myUsername: string, friend: User) {
    this.socketService.emitPromise('deleteFriend', JSON.stringify({
      friendUsername: friend.username,
      myUsername: myUsername,
    })).then(data => {
      if (data === 'success') {
        console.log("删除好友 " + friend.username + " 成功！");
        this.friendList.splice(this.friendList.indexOf(friend), 1);
        this.momentService.updateMoment(true);
        this.update();
      }
      else {
        alert('删除好友失败');
      }
    }).catch(err => {
      console.log('deleteFriend err:', err);
    });
  }

  searchUser(myUsername, friendUsername) {
    let url = 'http://120.25.238.161:3000/user/findUser?myUsername=' + myUsername + '&friendUsername=' + friendUsername;
    return this.http.get(url).toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          // 可以添加
          let tem = {
            myUsername: myUsername,
            friendUsername: friendUsername
          };

          return this.socketService.emitPromise('friendReq', JSON.stringify(tem)).then(data => {
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

}
