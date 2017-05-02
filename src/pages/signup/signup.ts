import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {User} from '../../entities/user';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SighupPage {
  user: User;
  locations: string[];
  showPsw: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,) {
    this.user = new User('', '', '');
    this.locations = ['中国大陆', '中国香港', '中国澳门', '中国台湾', '新加坡'];
    this.showPsw = false;
  }

  changeShowPsw() {
    this.showPsw = !this.showPsw;
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "注册中，请稍等",
    });

    loading.present();

    // get information from background
    // then dismiss the loading
    // then nav to the LoginPage

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

    this.navCtrl.setRoot(LoginPage);

  }

}
