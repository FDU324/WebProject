import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';

import {MomentNewPage} from './moment-new.component';
import {MomentZonePage} from './moment-zone.component';

import {MomentService} from '../../service/moment.service'

@Component({
  selector: 'page-moment-tab',
  templateUrl: 'moment-tab.component.html'
})
export class MomentTabPage {

  constructor(public appCtrl: App, public momentService: MomentService) {

  }

  gotoMomentZone() {
    this.momentService.clearNewMomentCount();
    this.appCtrl.getRootNav().push(MomentZonePage);
  }


  addMoment() {
    this.appCtrl.getRootNav().push(MomentNewPage);
  }


}