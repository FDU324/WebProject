import {Injectable} from '@angular/core';

import {User} from '../entities/user';
import {Moment} from '../entities/moment';

import {LocalUserService} from './local-user.service';

@Injectable()
export class MomentService {

  memonetDatabase: Moment[];
  newMomnentCount: number;

  constructor(public localUserService: LocalUserService) {
    //this.localUser = new User('Me', 'Who am I', 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');
    this.initMemonetDatabase();
  }

  initMemonetDatabase() {
    this.memonetDatabase = [];
    this.newMomnentCount = 3;

    let user = new User('username--0', 'fake--0', 'assets/icon/favicon.ico', '北京市-北京市-东城区',[]);
    let temEmotion = ['happy', '高兴', 'happy'];
    let temLocation = [
      ['121.598457,31.190464', '复旦大学张江校区', '复旦大学张江校区', 'http://restapi.amap.com/v3/staticmap?location=121.598457,31.190464&zoom=15&size=750*300&markers=mid,,:121.598457,31.190464&key=a55c3c970ecab69b1f6e51374a467bba'],
      ['121.503584,31.296426', '复旦大学邯郸校区', '复旦大学邯郸校区', 'http://restapi.amap.com/v3/staticmap?location=121.503584,31.296426&zoom=15&size=750*300&markers=mid,,:121.503584,31.296426&key=a55c3c970ecab69b1f6e51374a467bba'],
      ['121.450745,31.196852', '复旦大学枫林校区', '复旦大学枫林校区', 'http://restapi.amap.com/v3/staticmap?location=121.450745,31.196852&zoom=15&size=750*300&markers=mid,,:121.450745,31.196852&key=a55c3c970ecab69b1f6e51374a467bba'],
      ['121.506303,31.336578', '复旦大学江湾校区', '复旦大学江湾校区', 'http://restapi.amap.com/v3/staticmap?location=121.506303,31.336578&zoom=15&size=750*300&markers=mid,,:121.506303,31.336578&key=a55c3c970ecab69b1f6e51374a467bba'],
      ['121.320205,31.193935', '上海虹桥站', '上海虹桥站', 'http://restapi.amap.com/v3/staticmap?location=121.320205,31.193935&zoom=15&size=750*300&markers=mid,,:121.320205,31.193935&key=a55c3c970ecab69b1f6e51374a467bba'],
      ['121.33976,31.1961', '上海虹桥国际机场', '上海虹桥国际机场', 'http://restapi.amap.com/v3/staticmap?location=121.33976,31.1961&zoom=15&size=750*300&markers=mid,,:121.33976,31.1961&key=a55c3c970ecab69b1f6e51374a467bba'],
    ];
    let temText = '皮皮凯，我们走！！';
    let temImg = ['assets/icon/test.jpg'];

    for (let i = 0; i < 5; i++) {
      let moment = new Moment('public', user, Date.now(), temLocation[i], temEmotion, i, null, temText, temImg);

      if (i === 4) {
        moment.images = ['assets/icon/test.jpg',
          'assets/icon/test.jpg',
          'assets/icon/favicon.ico',
          'assets/icon/bg.jpg',
          'assets/icon/favicon.ico',
          'assets/icon/favicon.ico',
          'assets/icon/bg.jpg'
        ];
      }

      this.memonetDatabase.push(moment);
    }
    let moment = new Moment('public', user, Date.now(), temLocation[5], temEmotion, 5, null, temText);
    this.memonetDatabase.push(moment);
  }


  getMomentByUser(user: User): Moment[] {
    return this.memonetDatabase.filter(item => {
      return item.user.nickname.toLowerCase() == user.nickname.toLowerCase();
    })
  }

  getMomentList() {
    // TODO: get data from server
    this.memonetDatabase.forEach(moment => {
      if (moment.likeuser && moment.likeuser.length > 0) {
        if (moment.likeuser.indexOf(this.localUserService.getLocalUser()) >= 0) {
          moment.like = true;
        } else {
          moment.like = false;
        }
      } else {
        moment.like = false;
      }
    });
    return this.memonetDatabase;
  }

  sendMoment(moment: Moment, group) {
    // 这里moment的id都是-1,time都是空值
    // 设置time
    moment.time = Date.now();

    this.memonetDatabase.unshift(moment);

    return Promise.resolve(this.memonetDatabase);
  }

  getNewMomentCount() {
    return this.newMomnentCount;
  }

  clearNewMomentCount() {
    this.newMomnentCount = 0;
  }

  changeLike(moment: Moment, to: boolean) {
    if(to){
      // 赞
      if(moment.likeuser){
        moment.likeuser.push(this.localUserService.getLocalUser());
      }else{
        moment.likeuser = [this.localUserService.getLocalUser()];
      }
      return Promise.resolve(this.getMomentList());
    }else{
      // 取消赞
      let index = moment.likeuser.indexOf(this.localUserService.getLocalUser());
      moment.likeuser.splice(index, 1);
      return Promise.resolve(this.getMomentList());
    }

  }


}
