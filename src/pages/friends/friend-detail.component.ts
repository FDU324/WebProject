import {Component} from '@angular/core';
import {ViewController, NavParams, App} from 'ionic-angular';
import {User} from '../../entities/user';

import {ChatSessionPage} from '../chat/chat-session.component';
import {MomentListPage} from '../moment/moment-list.component';
import {FriendMapPage} from './friend-map.component';

import {LocalUserService} from '../../service/local-user.service'
import {ChatService} from '../../service/chat.service'
import {FriendListService} from "../../service/friend-list.service";

@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.component.html',
})

export class FriendDetailPage {
  friend: User;
  localUser: User;

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public appCtrl: App,
              public localUserService: LocalUserService,
              public chatService: ChatService,
              public friendListService: FriendListService) {
    this.friend = navParams.get('friend');
    this.localUser = localUserService.getLocalUser();
  }

  // 进入和某一好友的聊天页面
  gotoSession(friend) {
    //this.appCtrl.getRootNav().remove(this.appCtrl.getRootNav().length()-1);
    //console.log(this.appCtrl.getRootNav().length());
    //console.log('dismiss');
    this.appCtrl.getRootNav().push(ChatSessionPage, {
      localUser: this.localUserService.getLocalUser(),
      friend: friend
    });


  }

  gotoMoment(friend) {
    console.log('moment');
    this.appCtrl.getRootNav().push(MomentListPage, {
      user: friend
    })
  }

  gotoMomentMap() {
    console.log('map');
    this.appCtrl.getRootNav().push(FriendMapPage,{
      friend: this.friend
    });
  }

  deleteFriend(friend: User) {
    this.friendListService.deleteFriend(this.localUser.username,friend);
    this.viewCtrl.dismiss();
  }


}
