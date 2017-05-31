import {Injectable} from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class FriendListService {
  friendList: User[];
  friendReqList: User[];


  constructor() {
    this.friendList = [];
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i,  'assets/icon/favicon.ico', '北京市-北京市-东城区',[]);
      this.friendList.push(friend);
    }
    this.friendReqList = [];
    let friend = new User('username--50', 'fake--50',  'assets/icon/favicon.ico', '北京市-北京市-东城区');
    this.friendReqList.push(friend); 
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
