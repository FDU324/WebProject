import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';

import {MomentNewPage} from './moment-new.component';
import {MomentZonePage} from './moment-zone.component';

@Component({
  selector: 'page-moment-tab',
  templateUrl: 'moment-tab.component.html'
})
export class MomentTabPage {

  constructor(public appCtrl: App) {

  }

  gotoMomentZone() {
    this.appCtrl.getRootNav().push(MomentZonePage);
  }
}