import {Injectable} from '@angular/core';

import {User} from '../entities/user';
import {Moment} from '../entities/moment';

@Injectable()
export class MomentService {


  memonetDatabase: Moment[];

  constructor() {
    //this.localUser = new User('Me', 'Who am I', 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');
    this.initMemonetDatabase();
  }

  initMemonetDatabase() {
    this.memonetDatabase = [];
    for (let i = 0; i < 5; i++) {
      let user = new User('username--0', 'fake--0', 'sdfadsfas', 'assets/icon/favicon.ico', '北京市-北京市-东城区');
      let moment = new Moment('public', user, new Date().toLocaleString(), ['', 'zhangjiang', ''], ['happy', '高兴', 'happy']);
      moment.id = i;
      moment.text = 'fsdajflsakdjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffweijrnfkslakgajoijiigjfsdh';
      moment.images = ['assets/icon/favicon.ico'];
      this.memonetDatabase.push(moment);
    }

    let user = new User('username--0', 'fake--0', 'sdfadsfas', 'assets/icon/favicon.ico', '北京市-北京市-东城区');
    let moment = new Moment('public', user, new Date().toLocaleString(), ['', 'zhangjiang', ''], ['sad', '悲伤', 'sad']);
    moment.id = 5;
    moment.text = 'fsdajflsakdjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffweijrnfkslakgajoijiigjfsdh';
    //moment.images = [];
    moment.images = ['assets/icon/bg.jpg',
      'assets/icon/favicon.ico',
      'assets/icon/favicon.ico',
      'assets/icon/bg.jpg',
      'assets/icon/favicon.ico',
      'assets/icon/favicon.ico',
      'assets/icon/bg.jpg'
    ];
    this.memonetDatabase.push(moment);

  }

  getMomentByUser(user: User): Moment[] {
    return this.memonetDatabase.filter(item => {
      return item.user.nickname.toLowerCase() == user.nickname.toLowerCase();
    })
  }


  getMomentList() {
    return this.memonetDatabase;
  }

  sendMoment(moment: Moment, group) {
    // 这里moment的id都是-1,time都是空值
    // 设置time
    moment.time = new Date().toLocaleString();

    this.memonetDatabase.unshift(moment);

    return Promise.resolve(this.memonetDatabase);
  }
}
