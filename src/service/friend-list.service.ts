import { Injectable } from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class FriendListService {
  friendList: User[];

  constructor() {
    this.friendList = [];
    for(let i = 0; i< 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i, 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');
      this.friendList.push(friend);
    }
  }

  getFriendList() {
    return this.friendList;
  }

}
