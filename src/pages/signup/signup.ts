import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {CityPickerService} from "../../service/city-picker.service";
import {SignupLoginService} from "../../service/signup-login.service";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SighupPage {
  username: string;
  password: string;
  nickname: string;
  userImage: string;
  showPsw: boolean;
  cityData: any[]; //城市数据
  cityName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public cityPickerService: CityPickerService,
              public signupLoginService: SignupLoginService) {
    this.username = '';
    this.password = '';
    this.nickname = '';
    this.userImage = 'assets/icon/favicon.ico';
    this.cityName = "北京市-北京市-东城区";
    this.setCityPickerData();//得到城市数据
    this.showPsw = false;
  }

  /**
   * 获取城市数据
   */
  setCityPickerData() {
    this.cityPickerService.getCitiesData()
      .then(data => {
        this.cityData = data;
      });
  }

  changeShowPsw() {
    this.showPsw = !this.showPsw;
  }

  pickImage(){

  }


  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "注册中，请稍等",
    });

    loading.present();

    this.signupLoginService.signup(this.username, this.password, this.nickname, '', this.cityName);

    // get information from background
    // then dismiss the loading
    // then nav to the LoginPage

    setTimeout(() => {
      loading.dismiss();
    }, 2000);

    this.navCtrl.setRoot(LoginPage);

  }

}
