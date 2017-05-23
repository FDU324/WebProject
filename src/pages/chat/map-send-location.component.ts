import { Component, Output } from '@angular/core';
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

  @Output() nearestJunction: string;
  @Output() address: string;
  @Output() position: string;

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
    let self = this;
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
        self.nearestJunction = positionResult.nearestJunction;
        self.address = positionResult.address;
        self.position = positionResult.position;

        //console.log(self.address);
      });

      positionPicker.on('fail', function (positionResult) {
        self.nearestJunction = '';
        self.address = '海上或海外无法获得地址信息';
      });

    });
  }

  sendLoc() {
    console.log(this.address);
    let outputInfo = [this.position, this.address, this.nearestJunction];
    this.chatService.sendMessage(this.friend, 'locations', outputInfo).then(
      () => { this.viewCtrl.dismiss(); }
    );
  }

}