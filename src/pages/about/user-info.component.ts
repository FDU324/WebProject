/**
 * Created by wangziheng on 2017/5/3.
 */
import {Component, ApplicationModule} from '@angular/core';
import {User} from "../../entities/user";
import {Camera} from 'ionic-native';
import {NavController, NavParams, ActionSheetController, App} from "ionic-angular";
import {CityPickerService} from "../../service/city-picker.service";
import {ImgService} from "../../service/img.service";
import {NicknameChangePage} from "./nickname-change.component";
import {LoginPage} from "../login/login";
import {StartPage} from "../start/start";

@Component({
  templateUrl: 'user-info.component.html',
})
export class UserInfoPage {
  localUser: User;
  cityData: any[]; //城市数据
  cityName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public cityPickerService: CityPickerService,
              public imgService: ImgService,
              public appCtrl: App) {
    this.localUser = navParams.get('localUser');
    this.setCityPickerData();//得到城市数据
    this.cityName = this.localUser.location;//初始化城市名
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

  /**
   * 城市选择器被改变时触发的事件
   * @param event
   */
  cityChange(event) {
    this.localUser.location = this.cityName;
  }

  /**
   * 点击头像按钮后弹出的修改头像的sheet
   */
  changeImage() {
    let actionSheet = this.actionSheetCtrl.create({
      //title: 'Modify your album',
      buttons: [
        {
          text: '拍照',
          role: 'destructive',
          handler: () => {
            console.log('选择拍照');
            this.takeCamera();
          }
        }, {
          text: '从手机相册选择',
          handler: () => {
            console.log('选择相册');
            this.pickImg();
          }
        }, {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('退出');
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
        console.log(url);
        this.localUser.userimage = url[0];
      }
    });
  }

  takeCamera() {
    this.imgService.openCamara().then((url) => {
      if (url === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        console.log(url);
        this.localUser.userimage = url;
      }
    });
  }

  /**
   * 点击后进入修改昵称的界面
   */
  changeNickname() {
    this.appCtrl.getRootNav().push(NicknameChangePage, {
      localUser: this.localUser
    });
  }

  /**
   * 退出账号的点击事件
   */
  cancelAccount() {
    this.navCtrl.push(StartPage);
  }
}
