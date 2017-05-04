import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {User} from '../../entities/user';
import {CityPickerService} from "../../service/city-picker.service";
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SighupPage {
  user: User;
  locations: string[];
  showPsw: boolean;
  cityData: any[]; //城市数据
  cityName:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public cityPickerService: CityPickerService,) {
    this.user = new User('', '', '');
    //this.locations = ['中国大陆', '中国香港', '中国澳门', '中国台湾', '新加坡'];
    this.cityName = "北京市-北京市-东城区";
    this.setCityPickerData();//得到城市数据
    this.showPsw = false;
  }
  /**
   * 获取城市数据
   */
  setCityPickerData(){
    this.cityPickerService.getCitiesData()
      .then( data => {
        this.cityData = data;
      });
  }
  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event){
    this.user.location = this.cityName;
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
