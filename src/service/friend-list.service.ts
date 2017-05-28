import {Injectable} from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class FriendListService {
  friendList: User[];

  constructor() {
    this.friendList = [];
    for (let i = 0; i < 50; i++) {
      if (i === 0) {
        let friend = new User('123' + i, '123' + i, 'assets/icon/favicon.ico', '北京市-北京市-东城区');
        this.friendList.push(friend);
      } else if (i === 1) {
        let friend = new User('aaa' + i, 'aaa' + i, 'assets/icon/favicon.ico', '北京市-北京市-东城区');
        this.friendList.push(friend);
      } else {
        let friend = new User('username--' + i, 'fake--' + i, 'assets/icon/favicon.ico', '北京市-北京市-东城区');
        this.friendList.push(friend);
      }
    }
  }

  getFriendList() {
    return this.friendList;
  }

}
