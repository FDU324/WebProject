/**
 * Created by kadoufall on 2017/4/30.
 */
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Session} from '../../entities/session';
import {User} from '../../entities/user';

import { TabSwitchService } from '../../service/tab-switch.service';

@Component({
  selector: 'page-session',
  templateUrl: 'session.component.html',
})


export class SessionPage {
  session: Session;
  localUser: User;
  inputContent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tabSwitchService: TabSwitchService
  ) {
    this.session = navParams.get('session');
    this.localUser = navParams.get('localUser');
    this.inputContent = "";

  }


  ionViewCanLeave() {
    //console.log("leave chat page");
    this.tabSwitchService.switchTab(0);
  }

  onSubmit() {

  }



}
