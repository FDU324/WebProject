import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {User} from '../entities/user';
import {SocketService} from "./socket.service";


@Injectable()
export class FriendListService {
  friendList: User[];
  friendReqList: User[];
  observers: any[];

  constructor(public http: Http, public socketService: SocketService) {
    this.friendList = [];
    this.friendReqList = [];

    this.observers  = [];
/*
    let friend = new User('asd', 'asd',  'assets/icon/favicon.ico', '北京市-北京市-东城区')
    this.friendList.push(friend);
    friend = new User('asda', 'asda',  'assets/icon/favicon.ico', '北京市-北京市-东城区')
    this.friendList.push(friend);
 */   
    this.receiverOn();

  }

  receiverOn() {
    this.socketService.getSocket().on('receiveFriendReq', (user) => {
      console.log(JSON.parse(user));
      this.friendReqList.push(JSON.parse(user));
      this.update();
    });

    this.socketService.getSocket().on('friendReqAssent', (user) => {
      console.log(JSON.parse(user).nickname, '同意了请求');
      this.friendList.push(JSON.parse(user));
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

  getFriendList() {
    return this.friendList;
  }



  getFriendReqList() {
    return this.friendReqList;
  }

  getReqCount() {
    return this.friendReqList.length;
  }

  acceptRequest(myUsername: string, friend: User){
    //TODO: 接受好友请求
    this.socketService.emitPromise('acceptFriendReq', JSON.stringify({
      friendUsername: friend.username,
      myUsername: myUsername
    })).then(data => {
      console.log('data:', data);
      if(data === 'success') {
        this.friendReqList.splice(this.friendReqList.indexOf(friend), 1);
        this.friendList.push(friend);
        this.update();
      }
      else {
        console.log('添加好友失败');
      }
    }).catch(err => {
      console.log('err:', err);
    })
       
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
