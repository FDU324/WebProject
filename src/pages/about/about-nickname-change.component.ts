/**
 * Created by wangziheng on 2017/5/4.
 */
import {Component} from '@angular/core'
import {NavParams, NavController, ViewController, ToastController} from "ionic-angular";

import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {MomentService} from "../../service/moment.service";

@Component({
  templateUrl: 'about-nickname-change.component.html',
})

export class AboutNicknameChangePage {
  localUser: User;
  tempName: string;

  constructor(public navParams: NavParams,
              public navCtrl: NavController,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public localUserService: LocalUserService,
              public momentService: MomentService) {
    this.localUser = navParams.get('localUser');
    this.tempName = this.localUser.nickname;
  }

  saveNickname() {
    this.localUserService.modifyNickname(this.tempName).then(data => {
      if(data === 'success'){
        let toast = this.toastCtrl.create({
          message: '修改成功',
          duration: 1000,
          position: 'middle'
        });
        toast.onDidDismiss(() => {
          this.viewCtrl.dismiss();
        });
        this.momentService.updateMoment(true);
        toast.present();
      }else{
        let toast = this.toastCtrl.create({
          message: '修改失败，请重试',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
      }
    });


  }
}
