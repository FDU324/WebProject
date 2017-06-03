import { Component } from '@angular/core';
import { NavController, NavParams, App} from 'ionic-angular';

import {FriendAddPage} from './friend-add.component';
import {FriendDetailPage} from './friend-detail.component';
import {FriendReqPage} from './friend-request.component'

import {User} from "../../entities/user";
import {FriendListService} from '../../service/friend-list.service';
import {LocalUserService} from '../../service/local-user.service';
import {ChatService} from '../../service/chat.service';
import {GroupsDetailPage} from "./groups-detail.component";

@Component({
  selector: 'page-friends-tab',
  templateUrl: 'friends-tab.component.html',
  //providers:[FriendListService]
})
export class FriendsTabPage {
  friendList: User[];
  localUser: User;        // 当前的玩家
  friendReqList: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App,
              public localUserService: LocalUserService,
              public friendListService: FriendListService,
              public chatService: ChatService
              ) {
    this.friendList = friendListService.getFriendList();
    this.localUser = localUserService.getLocalUser();
    this.friendReqList = friendListService.getFriendReqList();
  }

  ionViewDidEnter() {
    this.friendListService.updateFriendList().then(friends=>{
      this.friendList = friends;
      this.friendListService.registerPage(this);
    });

  }

  ionViewDidLeave() {
    this.friendListService.removePage(this);
  }

  update() {
    this.friendListService.updateFriendList().then(friends=>{
      this.friendList = friends;
      this.friendReqList = this.friendListService.getFriendReqList();
    });
  }

  searchFriends(ev) {
    // Reset items back to all of the items
    this.friendList = this.friendListService.getFriendList();

    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.friendList = this.friendList.filter((item) => {
        return (item.nickname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  addFriend() {

    this.navCtrl.push(FriendAddPage, {
      localUser: this.localUser
    });


  }

  showDetail(friend: User) {
    this.appCtrl.getRootNav().push(FriendDetailPage, {
      friend: friend
    })
  }

  showGroupInfo() {
    this.appCtrl.getRootNav().push(GroupsDetailPage);
  }

  gotoFriendReqPage() {
    this.friendListService.clearNewFriendReq();
    this.appCtrl.getRootNav().push(FriendReqPage);
  }

}
