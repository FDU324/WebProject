/**
 * Created by wangziheng on 2017/5/4.
 */
import {Component} from '@angular/core'
import {NavParams, NavController, ViewController} from "ionic-angular";

import {User} from "../../entities/user";

@Component({
  templateUrl: 'about-nickname-change.component.html',
})

export class AboutNicknameChangePage {
  localUser: User;
  tempName: string;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController) {
    this.localUser = navParams.get('localUser');
    this.tempName = this.localUser.nickname;
  }

  saveNickname() {
    this.localUser.nickname = this.tempName;
    console.log(this.tempName);
    this.viewCtrl.dismiss();
  }
}
