import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';

import {User} from '../entities/user';

@Injectable()
export class LocalUserService {
  localUser: User;

  constructor(public http: Http,) {
    this.localUser = new User('Me', 'Who am I', 'assets/icon/favicon.ico', '北京市-北京市-东城区',[]);
  }

  getLocalUser(){
    return this.localUser;
  }
  getGroups(){
    return this.localUser.groups;
  }

  setLocalUser(user) {
    this.localUser = user;
  }

  modifyNickname(nickname) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/user/modifyNickname';
    let info = {
      username: this.localUser.username,
      nickname: nickname,
    };

    return this.http.put(url, JSON.stringify(info), options)
      .toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          this.localUser.nickname = nickname;
          return Promise.resolve('success');
        }
        return Promise.resolve('error');
      }).catch((error) => {
        console.log('LocalUserService-modifyNickname', error);
        return Promise.resolve('error');
      });
  }

  modifyLocation(location) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let url = 'http://localhost:3000/user/modifyLocation';
    let info = {
      username: this.localUser.username,
      location: location,
    };

    return this.http.put(url, JSON.stringify(info), options)
      .toPromise()
      .then(res => {
        if (res.json().data === 'success') {
          this.localUser.location = location;
          return Promise.resolve('success');
        }
        return Promise.resolve('error');
      }).catch((error) => {
        console.log('LocalUserService-modifyLocation', error);
        return Promise.resolve('error');
      });
  }
}
