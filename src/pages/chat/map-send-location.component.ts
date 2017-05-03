import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ChatService } from '../../service/chat.service';
import { User } from "../../entities/user";

@Component({
  selector: 'page-map-send-locatoon',
  templateUrl: 'map-send-location.component.html',
})
export class MapSendLocationPage {
  localUser: User;
  friend: User;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public chatService: ChatService, ) {
    this.localUser = navParams.get('localUser');
    this.friend = navParams.get('friend');
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.initialMap();
    });

  }

  initialMap() {
    //加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
    AMapUI.loadUI(['misc/PositionPicker'], function (PositionPicker) {
      let map = new AMap.Map('mapContainer', {
        zoom: 16
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
  }

  sendLoc() {
    let position = document.getElementById('position').innerHTML;
    let address = document.getElementById('address').innerHTML;
    let nearestJunction = document.getElementById('nearestJunction').innerHTML;
    let outputInfo = [position, address, nearestJunction];
    this.chatService.sendMessage(this.friend, 'locations', outputInfo).then(
      () => { this.viewCtrl.dismiss(); }
    );
  }

}