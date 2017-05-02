import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';

import {MomentDetailPage} from './moment-detail.component'

import {MomentService} from '../../service/moment.service';

@Component({
  selector: 'page-list-personal',
  templateUrl: 'moment-list.component.html',
})


export class MomentListPage {

  user: User;
  momentList: Moment[];

  constructor(public navParams: NavParams, public appCtrl: App, public momentService: MomentService) {
    this.user = navParams.get('user');
    this.momentList = momentService.getMomentByUser(this.user);
    //console.log(this.momentList);
  }

  showDetail(moment: Moment) {
    this.appCtrl.getRootNav().push(MomentDetailPage, {
      moment: moment
    });
  }


}
