import { Injectable } from '@angular/core';

import {User} from '../entities/user';

@Injectable()
export class LocalUserService {
  localUser: User;

  constructor() {
    this.localUser = new User('Me', 'Who am I', 'sdfadsfas', 'assets/icon/favicon.ico', '中国大陆');

  }

  getLocalUser() {
    return this.localUser;
  }
}
