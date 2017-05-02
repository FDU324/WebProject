import {Component} from '@angular/core';
import {ViewController, NavParams, App} from 'ionic-angular';
import {User} from '../../entities/user';

import {SessionPage} from '../chat/session.component';
import {MomentListPage} from '../moment/moment-list.component';

import {LocalUserService} from '../../service/local-user.service'
import {ChatService} from '../../service/chat.service'

@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.component.html',
})

export class FriendDetailPage {
  friend: User;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public appCtrl: App,
              public localUserService: LocalUserService,
              public chatService: ChatService) {
    this.friend = navParams.get('friend');
  }

  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    //this.appCtrl.getRootNav().remove(this.appCtrl.getRootNav().length()-1);


    //console.log(this.appCtrl.getRootNav().length());

    //console.log('dismiss');
    this.appCtrl.getRootNav().push(SessionPage, {
      localUser: this.localUserService.getLocalUser(),
      session: this.chatService.getSession(friend)
    });

    setTimeout(() => this.viewCtrl.dismiss(),1000);

  }

  gotoMoment(friend) {
    console.log('moment');
    this.appCtrl.getRootNav().push(MomentListPage, {
      user: friend
    })
  }

  gotoMomentMap(friend) {
    console.log('map');
  }


}
