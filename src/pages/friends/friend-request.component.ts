import { Component } from '@angular/core';
import { NavController, App} from 'ionic-angular';

import {User} from "../../entities/user";
import {FriendListService} from '../../service/friend-list.service';
import {LocalUserService} from '../../service/local-user.service';


@Component({
  selector: 'page-friends-request',
  templateUrl: 'friend-request.component.html',
  //providers:[FriendListService]
})

export class FriendReqPage {
  
  localUser: User;        // 当前的玩家
  friendReqList: User[];

  constructor(public navCtrl: NavController,
              public localUserService: LocalUserService,
              public friendListService: FriendListService,
              ) {
    this.localUser = localUserService.getLocalUser();
    this.friendReqList = friendListService.getFriendReqList();
  }

  acceptRequest(friend: User) {
    //TODO: 接受好友请求
    this.friendListService.acceptRequest(friend);
    console.log('accept request!');
  }


  



}
