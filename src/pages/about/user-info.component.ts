/**
 * Created by wangziheng on 2017/5/3.
 */
import { Component } from '@angular/core';
import {User} from "../../entities/user";
import {Camera } from 'ionic-native';
import {NavController, NavParams , ActionSheetController} from "ionic-angular";
import {CityPickerService} from "../../service/city-picker.service";
@Component({
  templateUrl: 'user-info.component.html',
})
export class UserInfoPage{
  localUser : User;
  cityData: any[]; //城市数据
  cityName:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              public cityPickerService: CityPickerService){
    this.localUser = navParams.get('localUser');
    this.setCityPickerData();//得到城市数据
    this.cityName = this.localUser.location;//初始化城市名
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
            //this.takePicture();
          }
        },{
          text: '从手机相册选择',
          handler: () => {
            console.log('选择相册');
          }
        },{
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
  /*
  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }
  */
}
