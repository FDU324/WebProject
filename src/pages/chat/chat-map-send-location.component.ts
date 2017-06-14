import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

import {User} from "../../entities/user";

import {ChatService} from '../../service/chat.service';
import {MomentService} from "../../service/moment.service";


@Component({
  selector: 'page-chat-map-send-locatoon',
  templateUrl: 'chat-map-send-location.component.html',
})
export class ChatMapSendLocationPage {
  localUser: User;
  friend: User;


  position: string;
  address: string;
  nearestJunction: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public momentService: MomentService,
              public chatService: ChatService,) {
    this.localUser = navParams.get('localUser');
    this.friend = navParams.get('friend');

    this.position = '';
    this.address = '';
    this.nearestJunction = '';
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

  sendLoc() {
    let position = document.getElementById('position').innerHTML;
    let address = document.getElementById('address').innerHTML;
    let nearestJunction = document.getElementById('nearestJunction').innerHTML;
    let temPosition = position.split(',');
    let url = "http://restapi.amap.com/v3/staticmap?location=" + temPosition[0] + "," + temPosition[1] + "&zoom=15&size=750*300&markers=mid,,:" + temPosition[0] + "," + temPosition[1] + "&key=a55c3c970ecab69b1f6e51374a467bba";

    let outputInfo = [position, address, nearestJunction, url];
    this.chatService.sendMessage(this.friend, 'locations', outputInfo).then(
      () => {
        this.viewCtrl.dismiss();
      }
    );

  }

}
