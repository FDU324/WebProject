import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';

import {User} from '../../entities/user';
import {FriendListService} from "../../service/friend-list.service";

@Component({
  selector: 'page-friend-add',
  templateUrl: 'friend-add.component.html',
})
export class FriendAddPage {
  localUser: User;
  username: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              public friendListService: FriendListService) {
    this.username = '';
    this.localUser = navParams.get('localUser');
  }

  onSubmit() {
    console.log(this.username);

    if(this.username === this.localUser.username){
      let toast = this.toastCtrl.create({
        message: '您不能添加自己为好友',
        duration: 1500,
        position: 'middle'
      });
      toast.onDidDismiss(() => {
        this.username = '';
      });
      toast.present();
    }else{
      this.friendListService.searchUser(this.localUser.username, this.username)
        .then(data => {
          if (data === 'notExist') {
            let toast = this.toastCtrl.create({
              message: '您输入的用户不存在',
              duration: 1500,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.username = '';
            });
            toast.present();
          } else if (data === 'friend') {
            let toast = this.toastCtrl.create({
              message: '该用户已是您的好友',
              duration: 1500,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.username = '';
            });
            toast.present();
          } else if (data === 'success') {
            let toast = this.toastCtrl.create({
              message: '申请通知已经发出，请等待对方同意',
              duration: 1500,
              position: 'middle'
            });
            toast.onDidDismiss(() => {
              this.username = '';
            });
            toast.present();
          } else {
            let toast = this.toastCtrl.create({
              message: '服务器繁忙，请稍后重试',
              duration: 1500,
              position: 'middle'
            });
            toast.present();
          }
        });
    }

  }


}
