import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {SighupPage} from "../signup/signup";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  showPsw: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,) {
    //this.username = '';
    this.username = this.navParams.get('username');
    this.password = '';
    this.showPsw = false;
  }

  changeShowPsw(){
    this.showPsw = !this.showPsw;
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "登录中，请稍等",
    });

    loading.present();

    // get information from background
    // then dismiss the loading
    // then nav to the TabsPage
    setTimeout(() => {
      loading.dismiss();
    }, 2000);

    this.navCtrl.setRoot(TabsPage);
  }
  gotoRegister(){
    this.navCtrl.push(SighupPage);
  }

  forget(){

  }

}
