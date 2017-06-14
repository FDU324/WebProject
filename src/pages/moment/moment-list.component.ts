import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';

import {MomentPage} from './moment.component'

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

  ionViewDidEnter() {
    this.momentList = this.momentService.getMomentByUser(this.user);
    this.momentService.registerPage(this);
  }

  ionViewDidLeave() {
    this.momentService.removePage(this);
  }

  update() {
    this.momentList = this.momentService.getMomentByUser(this.user);
  }

  showDetail(moment: Moment) {
    this.appCtrl.getRootNav().push(MomentPage, {
      moment: moment
    });
  }


}
