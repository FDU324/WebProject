/**
 * Created by kadoufall on 2017/5/22.
 */
import {Component} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {NavController} from "ionic-angular";

import {User} from "../../entities/user";
import {Moment} from "../../entities/moment";

import {MomentService} from "../../service/moment.service";

@Component({selector: 'page-friend-map', templateUrl: 'friend-map.component.html'})
export class FriendMapPage {
  friend : User;
  moments : Moment[];

  constructor(public navCtrl : NavController, public navParams : NavParams, public viewCtrl : ViewController, public momentService : MomentService) {
    this.friend = navParams.get('friend');
    // TODO: change to getMomentByUser()
    this.moments = momentService.getMomentList();
  }

  ionViewDidLoad() {

    let map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      zoom: 10,
      features: ['bg','point','building'],
    });

    let markers = [];
    let infos = [];
    for (let i = 0; i < this.moments.length; i++) {
      let icon = new AMap.Icon({
        //image: 'http://vdata.amap.com/icons/b18/1/2.png',
        size: new AMap.Size(24, 24)
      });

      let content = [];
      content.push("<div><div><img style=\"float:left;\" src=\" http://webapi.amap.com/images/autona" +
          "vi.png \"/></div> ");
      content.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件</b>");
      content.push("电话 : 010-84107000   邮编 : 100102");
      content.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");

      let marker = new AMap.Marker({
        icon: icon,
        position: this
          .moments[i]
          .location[0]
          .split(','),
        offset: new AMap.Pixel(-12, -12),
        zIndex: 101,
        title: this.moments[i].location[1],
        map: map,
        //content: content.join('<br/>'),
      });
      markers.push(marker);
    }
    map.setFitView();

    map.on('zoomchange', () => {
      console.log(map.getZoom());
      if (map.getZoom() >= 15) {
        markers.forEach(marker => {
          marker.setMap(null);
        });
      } else {
        markers.forEach(marker => {
          marker.setMap(map);
        });
      }
    });

  }

}
