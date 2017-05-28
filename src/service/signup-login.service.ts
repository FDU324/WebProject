/**
 * Created by kadoufall on 2017/5/28.
 */
import {Injectable} from '@angular/core';

import {User} from "../entities/user";

import {SocketService} from './socket.service';


@Injectable()
export class SignupLoginService {

  constructor(public socketService: SocketService) {

  }

  login(username, password) {
    // TODO: 验证
    // username, nickname, userimage, location
    let user = new User(username, username, 'assets/icon/favicon.ico', '北京市-北京市-东城区');

    let socket = this.socketService.initialSocket();

    return this.socketService.emitPromise(socket, 'login', username).then((data) => {
      if (data === 'success') {
        return Promise.resolve(user);
      }
      return Promise.resolve('SignupLoginService-login-error');
    }).catch(error => {
      console.log('SignupLoginService-login:', error);
      return Promise.resolve('SignupLoginService-login-error');
    });

  }

  signup(username, password, nickname, userimage, location) {

  }


}
