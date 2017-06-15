/**
 * Created by kadoufall on 2017/5/22.
 */
import {Component} from '@angular/core';
import {NavParams, ViewController, PopoverController, NavController} from "ionic-angular";

import {User} from "../../entities/user";
import {Moment} from "../../entities/moment";

import {MomentsAreaPage} from './moments-area.component';

import {MomentService} from "../../service/moment.service";

@Component({selector: 'page-friend-map', templateUrl: 'friend-map.component.html'})
export class FriendMapPage {
  friend: User;
  moments: Moment[];

  emojiDir: string = "../../assets/emoji/";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public momentService: MomentService,
              public popoverCtrl: PopoverController) {
    this.friend = navParams.get('friend');
    // TODO: change to getMomentByUser()
    this.moments = momentService.getMomentByUser(this.friend);
  }

  ionViewDidLoad() {

    let map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      zoom: 10,
      features: ['bg', 'point', 'building'],
    });

    let markers = this.generateMrkers(map);
    //map.setFitView();

    map.on('zoomchange', () => {
      console.log(map.getZoom());
      markers.forEach(marker => {
        marker.setMap(null);
      });
      markers = this.generateMrkers(map);
      //console.log("marker"+markers);
      //map.setFitView();

    });

  }

  quare(num: number) {
    return num * num;
  }

  generateMrkers(map) {

    let markers = [];
    let momentsCopy = this.moments.slice(0, this.moments.length);
    //console.log('h');
    // 根据每两个点之间的像素点判断是否合并。合并结果存入groups
    let groups = [];
    while (momentsCopy.length != 0) {
      let group = [];

      let position1 = momentsCopy[0].location[0].split(',');
      let pixel1 = map.lnglatTocontainer([Number(position1[0]), Number(position1[1])]);
      group.push(momentsCopy[0]);
      momentsCopy.splice(0, 1);


      for (let i = 0; i < momentsCopy.length;) {
        let position2 = momentsCopy[i].location[0].split(',');

        let pixel2 = map.lnglatTocontainer([Number(position2[0]), Number(position2[1])]);
        //console.log('dis:'+Math.sqrt(this.quare(pixel2.getX()-pixel1.getX())+this.quare(pixel2.getX()-pixel1.getX())));
        if (Math.sqrt(this.quare(pixel2.getX() - pixel1.getX()) + this.quare(pixel2.getY() - pixel1.getY())) < 50) {
          group.push(momentsCopy[i]);
          momentsCopy.splice(i, 1);
        }
        else
          i++;
      }
      groups.push(group);
    }

    //console.log(groups);

    for (let group of groups) {

      let content = [];
      content.push("<div style='width:50px;height:50px'>");
      let hasImg = false;
      for (let moment of group) {
        if (moment.images != undefined && moment.images.length > 0) {
          content.push("<img style='width:100%;height:100%;border:3px solid #f0f0f0;border-radius:5px;position:absolute;top:0;left:0' src= '" + moment.images[0] + "'/>");
          hasImg = true;
          break;
        }
      }
      if (!hasImg)
        content.push("<img style='width:100%;height:100%;border:2px solid #f0f0f0;border-radius:5px;position:absolute;top:0;left:0' src= 'http://120.25.238.161:3000/images/emotion/" + group[0].emotion[1] +".png" + "'/>");
      if (group.length > 1)
        content.push("<span style='font-size:12px;padding:2px 5px;font-weight:bold;color:#fff;background:#0080ff;border:1px solid #0080ff;border-radius:10px;position:absolute;top:-10px;right:-10px'>" + group.length + "</span>");
      content.push("</div>");
      //console.log(content.join(''));
      let marker = new AMap.Marker({

        position: group[0]
          .location[0]
          .split(','),
        offset: new AMap.Pixel(-12, -12),
        zIndex: 101,
        title: group[0].location[1],
        map: map,
        content: content.join(''),

      });
      AMap.event.addListener(marker, 'click', () => {
        this.popoverCtrl.create(MomentsAreaPage, {
          momentList: group
        }).present();
      });
      markers.push(marker);
    }
    return markers;

  }

}
