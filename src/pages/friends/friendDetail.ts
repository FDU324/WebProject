import { Component } from '@angular/core';
import { ViewController, NavParams, App} from 'ionic-angular';
import {User} from '../../user';

import {ChatContentPage} from '../chat/chatContent';
import {LocalUserService} from '../../service/localUser'
import {ChatListService} from '../../service/chatList'

@Component({
    selector: 'page-friendDetail',
   templateUrl: 'friendDetail.html',
})

export class FriendDetailPage {
    friend: User;
    constructor(public viewCtrl: ViewController, public navParams: NavParams, public appCtrl: App,
                public localUserService: LocalUserService,
                public chatListService: ChatListService ) {
        this.friend = navParams.get('friend');
    }

    // 进入和某一好友的聊天页面
  gotoChat(friend) {
      //this.appCtrl.getRootNav().remove(this.appCtrl.getRootNav().length()-1);
      
    
    
    //console.log(this.appCtrl.getRootNav().length());

      //console.log('dismiss');
    this.appCtrl.getRootNav().push(ChatContentPage, {
      currentUser: this.localUserService.getLocalUser(),
      friendsChat: this.chatListService.getChat(friend)
    })
  
    this.viewCtrl.dismiss();
  }

  

 
     
 

    
}
