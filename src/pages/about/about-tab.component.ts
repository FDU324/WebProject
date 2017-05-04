import { Component } from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {UserInfoPage} from "./user-info.component";

@Component({
  selector: 'page-about-tab',
  templateUrl: 'about-tab.component.html'
})
export class AboutTabPage {
  localUser: User;        // 当前的玩家
  constructor(public navCtrl: NavController,
              localUserService: LocalUserService,
              public appCtrl: App) {
      this.localUser = localUserService.getLocalUser();
  }
  gotoInfo(){ // 进入可以更改个人信息的页面
    this.appCtrl.getRootNav().push(UserInfoPage, {
      localUser: this.localUser
    });
  }
}
