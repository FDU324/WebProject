import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {ChatService} from '../../service/chat.service';
import {ImgService} from '../../service/img.service';
import {User} from "../../entities/user";

@Component({
  selector: 'page-map-send-locatoon',
  templateUrl: 'map-send-location.component.html',
})
export class MapSendLocationPage {
  localUser: User;
  friend: User;

  position: string;
  address: string;
  nearestJunction: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public imgService: ImgService,
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
    //let self = this;

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
        //self.nearestJunction = positionResult.nearestJunction;
        //self.address = positionResult.address;
        //self.position = positionResult.position;
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

    //console.log(document.getElementById('address').innerHTML);
    //console.log(this.address);
    //console.log('21312');
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
