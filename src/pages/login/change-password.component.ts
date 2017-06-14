/**
 * Created by wangziheng on 2017/6/14.
 */
import {Component} from '@angular/core';
import {NavController, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {SignupLoginService} from "../../service/signup-login.service";
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.component.html',
})
export class ChangePasswordPage{
  username: string;
  oldPsw: string;
  newPsw: string;
  newPswAgain: string;
  constructor(public alertCtrl: AlertController,
              public signupLoginService: SignupLoginService,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController){
    this.username = '';
    this.oldPsw = '';
    this.newPsw = '';
    this.newPswAgain = '';
  }
  onSubmit(){
    if (this.newPsw === this.oldPsw){
      let toast = this.toastCtrl.create({
        message: '新旧密码不能相同',
        duration: 1500,
        position: 'middle'
      });
      toast.onDidDismiss(() => {
        document.getElementById('new').getElementsByTagName('input')[0].focus();
        this.newPsw = '';
      });
      toast.present();
      return;
    }
    if (this.newPsw !== this.newPswAgain){
      let toast = this.toastCtrl.create({
        message: '两次密码不一致',
        duration: 1500,
        position: 'middle'
      });
      toast.onDidDismiss(() => {
        document.getElementById('newAgain').getElementsByTagName('input')[0].focus();
        this.newPswAgain = '';
      });
      toast.present();
      return;
    }
    let loading = this.loadingCtrl.create({
      content: "修改中，请稍等",
    });
    loading.present();
    this.signupLoginService.changePassword(this.username,this.oldPsw,this.newPsw)
      .then((res) => {
        if (res === 'success'){
          let toast = this.toastCtrl.create({
            message: '修改密码成功',
            duration: 1500,
            position: 'middle'
          });
          toast.onDidDismiss(() => {
            this.navCtrl.setRoot(LoginPage);
          });
          loading.dismiss();
          toast.present();
        }
        else if (res === 'wrong') {
          document.getElementById('old').getElementsByTagName('input')[0].focus();
          let alert = this.alertCtrl.create({
            title: '修改密码失败',
            subTitle: '账号和原始密码不匹配',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
        else {
          let alert = this.alertCtrl.create({
            title: '修改密码失败',
            subTitle: '请重试',
            buttons: ['确定']
          });
          loading.dismiss();
          alert.present();
        }
      })
  }
}
