import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import {StartPage} from "../start/start";
import {TabsPage} from '../tabs/tabs';
import {SighupPage} from "../signup/signup";

import {SignupLoginService} from '../../service/signup-login.service';
import {LocalUserService} from "../../service/local-user.service";
import {SocketService} from "../../service/socket.service";

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
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public localUserService: LocalUserService,
              public signupLoginService: SignupLoginService,
              public socketService: SocketService) {
    this.username = this.navParams.get('username') || '';
    this.password = '';
    this.showPsw = false;
  }

  changeShowPsw() {
    this.showPsw = !this.showPsw;
  }

  onSubmit() {
    let loading = this.loadingCtrl.create({
      content: "登录中，请稍等",
    });

    loading.present();

    this.signupLoginService.login(this.username, this.password).then((user) => {
      if (typeof user === 'object') {
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
        // 开始监听logout事件，一旦有人登录相同账号，此账号被迫退出
        this.socketService.getSocket().on('logout', () => {
          this.socketService.getSocket().disconnect();
          this.socketService.setSocketNull();
          let alert = this.alertCtrl.create({
            title: '警告',
            subTitle: '相同账号在另一个设备上登录',
            buttons: ['确定']
          });
          alert.present();
          this.navCtrl.setRoot(StartPage);
        });
      } else {
        let alert = this.alertCtrl.create({
          title: '登录失败',
          subTitle: '账号或密码错误，请检查后重试',
          buttons: ['确定']
        });
        loading.dismiss();
        alert.present();
      }
    }).catch((error) => {
      console.log('LoginPage-onSubmit', error);
    });
  }

  gotoRegister() {
    this.navCtrl.push(SighupPage);
  }

  forget() {

  }

}
