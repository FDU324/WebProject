import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, App, ViewController, Content} from 'ionic-angular';

import {User} from '../../entities/user';
import {MomentNewThenPage} from './moment-new-then.component';

import {LocalUserService} from '../../service/local-user.service';
import {MomentService} from '../../service/moment.service';
import {Session} from "../../entities/session";

@Component({selector: 'page-moment-new', templateUrl: 'moment-new.component.html'})

export class MomentNewPage {
  type: string;         // single, group, public
  localUser: User;
  friend: User;         // 对于单发动态，需要记录发送给谁

  // 位置信息
  position: string;
  address: string;
  nearestJunction: string;
  // 心情信息
  emotions: object[];
  chooseEmotion: string;    // 当前选择的心情，与emotions的value对应
  // 聊天信息，因为单独给好友发朋友圈要刷新session
  content: Content;
  session: Session;

  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public momentService: MomentService,
              public localUserService: LocalUserService) {
    this.localUser = localUserService.getLocalUser();
    this.type = navParams.get('type') || 'public';
    this.friend = navParams.get('friend') || null;
    this.position = '';
    this.address = '';
    this.nearestJunction = '';
    this.content = navParams.get('content') || null;
    this.session = navParams.get('session') || null;
    this.emotions = [
      {
        text: '赞',
        value: 'like',
        iconName: 'thumbs-up'
      },
      {
        text: '爱心',
        value: 'love',
        iconName: 'heart'
      },
      {
        text: '笑脸',
        value: 'haha',
        iconName: 'happy'
      },
      {
        text: '惊讶',
        value: 'wow',
        iconName: 'outlet'
      },
      {
        text: '悲伤',
        value: 'sad',
        iconName: 'sad'
      },
      {
        text: '愤怒',
        value: 'angry',
        iconName: 'thumbs-down'
      }
    ];
    this.chooseEmotion = 'like';
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.initialMap();
    });
  }

  initialMap() {
    this.momentService.getCurrentLocation().then(loc => {
      //加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
        let map = new AMap.Map('mapContainer', {
          zoom: 16,
          center: loc[0] === -1 ? [121.599459, 31.191671] : loc
        });

        let positionPicker = new PositionPicker({
          mode: 'dragMap',//设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map//依赖地图对象
        });

        positionPicker.start();

        positionPicker.on('success', function (positionResult) {
          document.getElementById('nearestJunction').innerHTML = positionResult.nearestJunction;
          document.getElementById('address').innerHTML = positionResult.address;
          document.getElementById('position').innerHTML = positionResult.position;
        });

        positionPicker.on('fail', function (positionResult) {
          document.getElementById('nearestJunction').innerHTML = '';
          document.getElementById('address').innerHTML = '海上或海外无法获得地址信息';
        });

      });
    });

  }

  // 确认选择的位置和心情
  locEmotion() {
    let position = document.getElementById('position').innerHTML;
    let address = document.getElementById('address').innerHTML;
    let nearestJunction = document.getElementById('nearestJunction').innerHTML;
    let temPosition = position.split(',');
    let url = "http://restapi.amap.com/v3/staticmap?location=" + temPosition[0] + "," + temPosition[1] + "&zoom=15&size=750*300&markers=mid,,:" + temPosition[0] + "," + temPosition[1] + "&key=a55c3c970ecab69b1f6e51374a467bba";
    let locInfo = [position, address, nearestJunction, url];

    let emotionInfo = this.emotions.find((emotion) => emotion['value'] === this.chooseEmotion);

    this.appCtrl.getRootNav().push(MomentNewThenPage, {
      locInfo: locInfo,           //  [position, address, nearestJunction]
      emotionInfo: [emotionInfo['text'], emotionInfo['value'], emotionInfo['iconName']],
      type: this.type,
      friend: this.friend,
      session: this.session,
      content: this.content,
    });

  }

}
