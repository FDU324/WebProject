import { Component } from '@angular/core';
import { NavController, NavParams, App} from 'ionic-angular';

import { ChatContentPage } from '../chat/chatContent'
import {AddFriendPage} from './addFriend';
import {FriendDetailPage} from './friendDetail';

import {User} from "../../user";
import {FriendListService} from '../../service/friendList';
import {LocalUserService} from '../../service/localUser';
import {ChatListService} from '../../service/chatList';

@Component({
  selector: 'page-contact',
  templateUrl: 'friends.html',
  //providers:[FriendListService]
})
export class FriendsPage {
  friendList: User[];
  currentUser: User;        // 当前的玩家


  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App,
              public localUserService: LocalUserService, 
              public friendListService: FriendListService,
              public chatListService: ChatListService
              ) {
    this.friendList = friendListService.getFriendList();
    this.currentUser = localUserService.getLocalUser();
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
    
    this.navCtrl.push(AddFriendPage, {
      currentUser: this.currentUser
    });
    
    
  }

  showDetail(friend: User) {
    this.appCtrl.getRootNav().push(FriendDetailPage, {
      friend: friend
    })
  }

   

}
