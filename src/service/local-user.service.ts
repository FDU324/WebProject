import {Injectable} from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class LocalUserService {
  localUser: User;

  constructor() {
    this.localUser = new User('Me', 'Who am I', 'assets/icon/favicon.ico', '北京市-北京市-东城区');

  }

  getLocalUser() {
    return this.localUser;
  }
}
