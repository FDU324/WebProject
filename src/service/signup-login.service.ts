/**
 * Created by kadoufall on 2017/5/28.
 */
import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {User} from "../entities/user";

import {SocketService} from './socket.service';
import {Group} from "../entities/group";


@Injectable()
export class SignupLoginService {

  constructor(public http: Http,
              public socketService: SocketService) {

  }

  login(username, password) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://120.25.238.161:3000/user/login';
    let info = {
      username: username,
      password: password,
    };

    return this.http.post(url, JSON.stringify(info), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          let infoGet = JSON.parse(res.json().user);
          //let groups = [];
          let groupInfo = JSON.parse(infoGet.groups);
          let user = new User(infoGet.username, infoGet.nickname, infoGet.userImage, infoGet.location,groupInfo);

          return this.socketService.socketConnect().then(data => {
            if (data === 'success') {
              return this.socketService.emitPromise('login', infoGet.username).then((data) => {
                if (data === 'success') {
                  return Promise.resolve(user);
                }
                return Promise.resolve('SignupLoginService-login-error');
              }).catch(error => {
                console.log('SignupLoginService-login:', error);
                return Promise.resolve('SignupLoginService-login-error');
              });
            } else {
              return Promise.resolve('SignupLoginService-login-error');
            }
          });
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SignupLoginService-login', error);
        return Promise.resolve('error');
      });
  }

  signup(username, password, nickname, userImage, location, groups) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/user/addUser';
    let user = {
      username: username,
      password: password,
      nickname: nickname,
      userImage: userImage,
      location: location,
      groups: JSON.stringify(groups),
    };

    return this.http.post(url, JSON.stringify(user), options)
      .toPromise()
      .then((res) => {
        if (res.json().data === 'success') {
          return Promise.resolve('success');
        } else {
          return Promise.resolve('error');
        }
      }).catch((error) => {
        console.log('SignupLoginService-signup', error);
      });

  }


}
