import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-map-see-detail',
  templateUrl: 'map-see-detail.component.html',
})
export class MapSeeDetailPage {
  content: string[];
  address: string;
  nearestJunction: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController, ) {
    this.content = navParams.get('content');
    this.address = this.content[1];
    this.nearestJunction = this.content[2];
  }

  ionViewDidLoad() {
    let tem = this.content[0].split(',');
    let map = new AMap.Map('mapContainer', {
      resizeEnable: true,
      zoom: 16,
      center: [tem[0], tem[1]]
    });

    AMap.plugin(['AMap.ToolBar'], function () {
      map.addControl(new AMap.ToolBar());
    })

    let marker = new AMap.Marker({
      position: map.getCenter(),
      draggable: true,
      cursor: 'move'
    });
    marker.setMap(map);
    marker.setAnimation('AMAP_ANIMATION_BOUNCE');

  }


}