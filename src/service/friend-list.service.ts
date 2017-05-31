import {Injectable} from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class FriendListService {
  friendList: User[];

  constructor() {
    this.friendList = [];
    for (let i = 0; i < 50; i++) {
      let friend = new User('username--' + i, 'fake--' + i,  'assets/icon/favicon.ico', '北京市-北京市-东城区',[]);
      this.friendList.push(friend);
    }
  }

  getFriendList() {
    return this.friendList;
  }

}
