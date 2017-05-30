/**
 * Created by wangziheng on 2017/5/3.
 */
import {Component, ApplicationModule} from '@angular/core';
import {NavController, NavParams, ActionSheetController, App} from "ionic-angular";
import {Camera} from 'ionic-native';

import {CityPickerService} from "../../service/city-picker.service";
import {ImgService} from "../../service/img.service";

import {User} from "../../entities/user";

import {AboutNicknameChangePage} from "./about-nickname-change.component";
import {LoginPage} from "../login/login";
import {StartPage} from "../start/start";
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';

@Component({
  templateUrl: 'about-user-info.component.html',
})
export class AboutUserInfoPage {
  localUser: User;
  cityData: any[]; //城市数据
  cityName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public cityPickerService: CityPickerService,
              public imgService: ImgService,
              public appCtrl: App,
              public transfer: Transfer) {
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
  /**
   * 传入一个file对象，将其以二进制流的方式传给服务器

  sendFile(url){
    var fileTransfer : TransferObject = this.transfer.create();
    const dest = "http://120.25.238.161:3000/upload.json";
    var options = {
      user:this.localUser.username,
      filename:"test.jpg",
    }
    fileTransfer.upload(url,dest,options).then((data) => {
      alert("正在上传");
    }, (err) => {
      alert("出错啦");
    });

  }
  */
  pickImg() {
    this.imgService.openImgPickerSingle().then((url) => {
      if (url[0] === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        this.imgService.sendFile(this.localUser,url);
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
        this.imgService.sendFile(this.localUser,url);
        this.localUser.userimage = url;
        //console.log(url);

      }
    });
  }

  /**
   * 点击后进入修改昵称的界面
   */
  changeNickname() {
    this.appCtrl.getRootNav().push(AboutNicknameChangePage, {
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
