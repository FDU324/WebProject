import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';

@Component({
  selector: 'page-moment-new',
  templateUrl: 'moment-new.component.html'
})


export class MomentNewPage {

  user: User;
  constructor(public navParams: NavParams, public appCtrl: App) {
    //this.user = navParams.get('user');
  }

}
