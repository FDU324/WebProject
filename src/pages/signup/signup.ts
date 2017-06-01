import {Component} from '@angular/core';
import {
  NavController, NavParams,
  LoadingController, ActionSheetController,
  AlertController, ToastController
} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {CityPickerService} from "../../service/city-picker.service";
import {SignupLoginService} from "../../service/signup-login.service";
import {ImgService} from "../../service/img.service";
import {Group} from "../../entities/group";

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
  groups: Group[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public imgService: ImgService,
              public cityPickerService: CityPickerService,
              public signupLoginService: SignupLoginService) {
    this.username = '';
    this.password = '';
    this.nickname = '';
    this.userImage = 'assets/icon/favicon.ico';
    this.cityName = "北京市-北京市-东城区";
    this.groups = [];
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

  changeImage() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            this.takeCamera();
          }
        }, {
          text: '从手机相册选择',
          handler: () => {
            this.pickImg();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  pickImg() {
    this.imgService.openImgPickerSingle().then((url) => {
      if (url[0] === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        //this.imgService.sendFile(this.localUser, url);
        console.log(url);
        //this.localUser.userimage = url[0];
      }
    });
  }

  takeCamera() {
    this.imgService.openCamara().then((url) => {
      if (url === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        //this.imgService.sendFile(this.localUser, url);
        //this.localUser.userimage = url;
        console.log(url);
      }
    });
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "注册中，请稍等",
    });

    loading.present();

    this.signupLoginService.signup(this.username, this.password, this.nickname, this.userImage, this.cityName, this.groups)
      .then((data) => {
        if (data === 'success') {
          let toast = this.toastCtrl.create({
            message: '注册成功',
            duration: 1500,
            position: 'middle'
          });
          toast.onDidDismiss(() => {
            this.navCtrl.setRoot(LoginPage);
          });

          loading.dismiss();
          toast.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: '注册失败',
            subTitle: '账号已被注册或服务器错误，请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      });


  }

}
