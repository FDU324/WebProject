import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Geolocation} from '@ionic-native/geolocation';

import {User} from '../entities/user';
import {Moment} from '../entities/moment';
import {Comment} from '../entities/comment';

import {LocalUserService} from './local-user.service';
import {SocketService} from "./socket.service";
import {ImgService} from "./img.service";

@Injectable()
export class MomentService {

  momentDatabase: Moment[];
  newMomentCount: number;

  observers: any[];

  constructor(public http: Http,
              public geolocation: Geolocation,
              public localUserService: LocalUserService,
              public socketService: SocketService,
              public imgService: ImgService) {
  }

  updateAfterLogin() {
    this.momentDatabase = [];
    this.newMomentCount = 0;
    this.observers = [];

    this.receiverOn();

    return this.updateMoment(true).then(data => {
      if (data === 'success') {
        console.log('update momentService success, ', this.momentDatabase.length);
      } else {
        console.log('MomentService-constructor:', data);
      }
    });
  }

  receiverOn() {
    // 新动态
    this.socketService.getSocket().on('receiveMoment', data => {
      console.log('receiveMoment');
      let newMoment = JSON.parse(data);
      let exist = this.momentDatabase.some((moment) => {
        return moment.id === newMoment.id;
      });
      if (!exist) {     // 可能已经有更新后的同一个moment在列表中
        this.momentDatabase.unshift(newMoment);
        if(newMoment.user.username !== this.localUserService.localUser.username){
          this.newMomentCount++;
        }
        this.update();
      }
    });

    // 删除动态
    this.socketService.getSocket().on('deleteMoment', data => {
      console.log('deleteMoment');
      let jsonData = JSON.parse(data);
      console.log(jsonData);

      let index = this.momentDatabase.findIndex((value, index, arr) => {
        return value.id === jsonData;
      });

      if (index === -1) {
        console.log('moment delete: no such moment')
      } else {
        this.momentDatabase.splice(index, 1);
      }

      this.update();
    });

    // 赞的改变
    this.socketService.getSocket().on('receiveChangeLike', data => {
      console.log('receiveLike');
      let jsonData = JSON.parse(data);
      let updateMoment = jsonData.receiveMoment;
      let index = this.momentDatabase.findIndex((value, index, arr) => {
        return value.id === updateMoment.id;
      });

      console.log(updateMoment);

      if (index === -1) {
        this.momentDatabase.unshift(updateMoment);
      } else {
        this.momentDatabase.splice(index, 1, updateMoment);
      }

      if (jsonData.changeTO && jsonData.isOwner) {  // 仅在其他用户点赞自己的时候才++
        this.newMomentCount++;
      }
      this.update();
    });

    // 新评论
    this.socketService.getSocket().on('receiveComment', data => {
      console.log('receiveComment');
      let jsonData = JSON.parse(data);
      console.log(jsonData);
      let updateMoment = jsonData.receiveMoment;
      let index = this.momentDatabase.findIndex((value, index, arr) => {
        return value.id === updateMoment.id;
      });

      if (index === -1) {
        this.momentDatabase.unshift(updateMoment);
      } else {
        this.momentDatabase.splice(index, 1, updateMoment);
      }

      if (jsonData.showAlert) {
        this.newMomentCount++;
      }
      this.update();
    });

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
    return this.momentDatabase.filter(item => {
      return item.user.username.toLowerCase() == user.username.toLowerCase();
    })
  }

  getMomentById(id: number) {
    return this.momentDatabase.find(item => {
      return item.id === id;
    });
  }

  /**
   * 加载[0, time]时间段内的动态，其中isInitial设为true时，time为Date.now()
   *    isInitial为false时，time为当前动态列表的最后一条动态的time
   */
  updateMoment(isInitial: boolean) {
    let username = 'username=' + this.localUserService.localUser.username;
    let requestTime = '&requestTime=';
    if (isInitial)
      requestTime += Date.now();
    else
      requestTime += this.momentDatabase.length > 0 ? (this.momentDatabase[this.momentDatabase.length - 1].time) : Date.now();

    let url = 'http://120.25.238.161:3000/moment/getMoments?' + username + requestTime;
    return this.http.get(url).toPromise().then(res => {
      if (res.json().success) {
        let moments = JSON.parse(res.json().data);
        if (isInitial)
          this.momentDatabase = [];
        moments.forEach(moment => {
          this.momentDatabase.push(moment);
        });

        return 'success';
      } else {
        // 服务器错误
        console.log('MomentService-updatePartialMoment:', res.json().data);
        return 'error';
      }
    }).catch(error => {
      console.log('MomentService-updatePartialMoment:', error);
      return error;
    });
  }

  getMomentList() {
    // 按时间排序
    const compare = (a, b) => {
      return b.time - a.time;
    };

    return this.momentDatabase.sort(compare);
  }

  sendMoment(moment: Moment) {
    moment.time = Date.now();
    /*
     for (let i = 0; i < moment.images.length; i++) {
     this.imgService.sendFile(moment.user, moment.images[i], 'moment')
     .then((data) => {
     if (data !== 'error')
     moment.images[i] = data;
     });
     }*/
    let promises = moment.images.map(image => {
      return this.imgService.sendFile(moment.user, image, 'moment');
    });
    return Promise.all(promises).then((a) => {
      let validUrls = a.filter(item => {
        return item !== 'error';
      });
      moment.images = validUrls;
      return this.socketService.emitPromise('sendMoment', JSON.stringify(moment)).then(data => {
        if (data === 'success') {
          //this.momentDatabase.unshift(moment);
        }
        return data;
      });
    }).catch(error => {
      return 'error';
    });

  }

  deleteMoment(moment: Moment) {
    return this.socketService.emitPromise('deleteMoment', JSON.stringify(moment)).then(data => {
      if (data === 'success') {
        return 'success';
      } else {
        console.log('MomentService-deleteMoment:', data);
        return data;
      }
    });
  }

  getNewMomentCount() {
    return this.newMomentCount;
  }

  clearNewMomentCount() {
    this.newMomentCount = 0;
  }

  // 赞与取消赞
  changeLike(moment: Moment, to: boolean) {
    let info = {
      moment: moment,
      username: this.localUserService.localUser.username,
      changeTO: to,
    };

    return this.socketService.emitPromise('changeLike', JSON.stringify(info)).then(data => {
      if (data === 'success') {
        return 'success';
      } else {
        console.log('MomentService-changeLike:', data);
        return data;
      }
    });
  }

  addComment(moment: Moment, to: User, content: string) {
    let info = {
      moment: moment,
      username: this.localUserService.localUser.username,
      to: to === null ? '' : to.username,
      content: content,
      actionType: 'create'
    };

    return this.socketService.emitPromise('comment', JSON.stringify(info)).then(data => {
      if (data === 'success') {
        return 'success';
      } else {
        console.log('MomentService-addComment:', data);
        return data;
      }
    });
  }

  deleteComment(moment: Moment, comment: Comment) {
    let info = {
      moment: moment,
      username: this.localUserService.localUser.username,
      to: '',
      actionType: 'delete',
      comment: comment
    };

    return this.socketService.emitPromise('comment', JSON.stringify(info)).then(data => {
      if (data === 'success') {
        return 'success';
      } else {
        console.log('MomentService-deleteComment:', data);
        return data;
      }
    });
  }

  getCurrentLocation() {
    let GPSLoc = this.geolocation.getCurrentPosition().then((resp) => {
      return [resp.coords.latitude, resp.coords.longitude];
    }).catch((error) => {
      console.log('Error getting location', error);
      return [-1, -1];
    });

    return GPSLoc.then(gpsLoc => {
      if (gpsLoc[0] === -1) {
        return gpsLoc;
      }

      let url = "http://restapi.amap.com/v3/assistant/coordinate/convert?locations=" + gpsLoc[1] + "," + gpsLoc[0] + "&coordsys=gps&key=a55c3c970ecab69b1f6e51374a467bba";
      return this.http.get(url).toPromise().then(response => {
        let datas = response.json().locations;
        let tem = datas.toString().split(";");   // 取第一组
        let re = [];    // 经度，纬度
        let temm = tem[0].split(",");
        re.push(temm[0], temm[1]);
        console.log('getLocation success', re);
        return re;
      }).catch(error => {
        console.log('MomentService-updatePartialMoment:', error);
        return [-1, -1];
      });
    });
  }


}
