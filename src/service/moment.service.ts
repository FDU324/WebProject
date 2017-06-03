import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import {User} from '../entities/user';
import {Moment} from '../entities/moment';

import {LocalUserService} from './local-user.service';
import {SocketService} from "./socket.service";

@Injectable()
export class MomentService {

  memonetDatabase: Moment[];
  newMomnentCount: number;

  constructor(public http: Http,
              public localUserService: LocalUserService,
              public socketService: SocketService,) {
    this.memonetDatabase = [];
    this.newMomnentCount = 0;

    this.updatePartialMoment(true).then(moments => {
      moments.forEach(moment=>{
        this.memonetDatabase.push(moment);
      });
      console.log(this.memonetDatabase.length);
    }).catch(err => {
      console.log('MomentService-constructor:', err);
    });
  }

  getMomentByUser(user: User): Moment[] {
    return this.memonetDatabase.filter(item => {
      return item.user.nickname.toLowerCase() == user.nickname.toLowerCase();
    })
  }

  // 加载新动态
  updatePartialMoment(isInitial: boolean) {
    let username = '&username=' + this.localUserService.localUser.username;
    let currentTime = '&currentTime=' + Date.now();
    let lastTime = '&lastTime=' + (this.memonetDatabase.length > 0 ? (this.memonetDatabase[this.memonetDatabase.length - 1].time) : 0);

    let url = 'http://localhost:3000/moment/getMoments?initial=' + isInitial + username + currentTime + lastTime;
    return this.http.get(url).toPromise().then(res => {
      if (res.json().success) {
        return JSON.parse(res.json().data);
      } else {
        // 服务器错误
        console.log('MomentService-updatePartialMoment:', res.json().data);
        return [];
      }
    }).catch(error => {
      console.log('MomentService-updatePartialMoment:', error);
      return [];
    });
  }

  getMomentList() {
    return this.memonetDatabase;
  }

  sendMoment(moment: Moment) {
    moment.time = Date.now();

    return this.socketService.emitPromise('sendMoment', JSON.stringify(moment)).then(data => {
      if (data === 'success') {
        this.memonetDatabase.unshift(moment);
      }
      return data;
    });
  }

  getNewMomentCount() {
    return this.newMomnentCount;
  }

  clearNewMomentCount() {
    this.newMomnentCount = 0;
  }

  changeLike(moment: Moment, to: boolean) {
    if (to) {
      // 赞
      if (moment.likeuser) {
        moment.likeuser.push(this.localUserService.getLocalUser());
      } else {
        moment.likeuser = [this.localUserService.getLocalUser()];
      }
      return Promise.resolve(this.getMomentList());
    } else {
      // 取消赞
      let index = moment.likeuser.indexOf(this.localUserService.getLocalUser());
      moment.likeuser.splice(index, 1);
      return Promise.resolve(this.getMomentList());
    }

  }


}
