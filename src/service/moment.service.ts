import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

import {User} from '../entities/user';
import {Moment} from '../entities/moment';

import {LocalUserService} from './local-user.service';
import {SocketService} from "./socket.service";
import {ImgService} from "./img.service";

@Injectable()
export class MomentService {

  memonetDatabase: Moment[];
  newMomnentCount: number;


  observers: any[];

  constructor(public http: Http,
              public localUserService: LocalUserService,
              public socketService: SocketService,
              public imgService: ImgService) {
    //this.initMemonetDatabase();
    this.memonetDatabase = [];
    this.newMomnentCount = 0;
    this.observers = [];

    this.receiverOn();

    this.updatePartialMoment(true).then(moments => {
      moments.forEach(moment => {
        this.memonetDatabase.push(moment);
      });
      console.log(this.memonetDatabase.length);
    }).catch(err => {
      console.log('MomentService-constructor:', err);
    });
  }


  receiverOn() {
    this.socketService.getSocket().on('receiveMoment', data => {
      console.log(data)
      let moment = JSON.parse(data);
      console.log(moment)
      this.memonetDatabase.unshift(moment);
      this.newMomnentCount++;
      this.update();
    })
  }

  registerPage(page: any) {
    this.observers.push(page);
    //component.log('register!');
  }

  removePage(page: any) {
    this.observers.splice(this.observers.indexOf(page), 1);
    //component.log('remove!');
  }

  update() {
    this.observers.forEach(item => item.update());
  }

  getMomentByUser(user: User): Moment[] {
    return this.memonetDatabase.filter(item => {
      return item.user.nickname.toLowerCase() == user.nickname.toLowerCase();
    })
  }

  /**
   * 加载[0, time]时间段内的动态，其中isInitial设为true时，time为Date.now()
   *    isInitial为false时，time为当前动态列表的最后一条动态的time
   */
  updatePartialMoment(isInitial: boolean) {
    let username = 'username=' + this.localUserService.localUser.username;
    let requestTime;
    if (isInitial)
      requestTime = Date.now();
    else
      requestTime = this.memonetDatabase.length > 0 ? (this.memonetDatabase[this.memonetDatabase.length - 1].time) : Date.now();

    let url = 'http://localhost:3000/moment/getMoments?' + username + requestTime;
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
    for (let i = 0; i < moment.images.length; i++) {
      this.imgService.sendFile(moment.user, moment.images[i], 'moment')
        .then((data) => {
          if (data !== 'error')
            moment.images[i] = data;
        });
    }
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
