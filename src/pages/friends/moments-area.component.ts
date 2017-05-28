import {Component} from '@angular/core';
import {NavParams, App, ViewController} from 'ionic-angular';

import {Moment} from '../../entities/moment';

import {MomentPage} from '../moment/moment.component';

@Component({
  selector: 'page-moments-area',
  templateUrl: 'moments-area.component.html',
})


export class MomentsAreaPage {

  momentList: Moment[];
  //commentList: Comment[];
  ;

  constructor(public appCtrl: App, public navParams: NavParams, public viewCtrl: ViewController) {
    this.momentList = navParams.get('momentList');
   
    //this.momentList = momentService.getMomentByUser(this.user);
    //console.log(this.momentList);
  }

  showDetail(moment: Moment) {
    this.appCtrl.getRootNav().push(MomentPage, {
      moment: moment
    });
    this.viewCtrl.dismiss();
  }

}
