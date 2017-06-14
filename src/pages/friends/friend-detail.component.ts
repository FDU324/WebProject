import {Component} from '@angular/core';
import {ViewController, NavParams, App, AlertController} from 'ionic-angular';
import {User} from '../../entities/user';

import {ChatSessionPage} from '../chat/chat-session.component';
import {MomentListPage} from '../moment/moment-list.component';
import {FriendMapPage} from './friend-map.component';

import {LocalUserService} from '../../service/local-user.service'
import {ChatService} from '../../service/chat.service'
import {FriendListService} from "../../service/friend-list.service";
import {Group} from "../../entities/group";

@Component({
  selector: 'page-friend-detail',
  templateUrl: 'friend-detail.component.html',
})

export class FriendDetailPage {
  friend: User;
  localUser: User;
  groups: Group[];
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public appCtrl: App,
              public localUserService: LocalUserService,
              public chatService: ChatService,
              public friendListService: FriendListService,
              public alertCtrl: AlertController) {
    this.friend = navParams.get('friend');
    this.localUser = localUserService.getLocalUser();
    this.groups = this.getGroupsIncludingThis();
  }
  getGroupsIncludingThis(){
    let g = this.localUserService.getGroups();
    let res: Group[] = [];
    for (let i = 0 ; i < g.length ; i++){
      for (let j = 0 ; j < g[i].members.length ; j++){
        if (g[i].members[j].username === this.friend.username) {
          res.push(g[i]);
          break;
        }
      }
    }
    return res;
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
  showConfirm(friend: User) {
    let confirm = this.alertCtrl.create({
      title: '确认删除',
      message: '你确认删除好友 '+ friend.nickname +' 吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            this.deleteFriend(friend);
          }
        },
      ]
    });
    confirm.present();
  }
  deleteFriend(friend: User) {
    this.friendListService.deleteFriend(this.localUser.username,friend);
    this.viewCtrl.dismiss();
  }


}
