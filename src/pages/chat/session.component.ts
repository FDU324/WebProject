/**
 * Created by kadoufall on 2017/4/30.
 */
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';

import { Session } from '../../entities/session';
import { User } from '../../entities/user';
import { SessionSearchPage } from './session-search.component';
import { MapSendLocationPage } from './map-send-location.component';
import { MapSeeDetailPage } from './map-see-detail.component';

import { TabSwitchService } from '../../service/tab-switch.service';
import { ChatService } from '../../service/chat.service';
import { ImgService } from '../../service/img.service';


@Component({
  selector: 'page-session',
  templateUrl: 'session.component.html',
})


export class SessionPage {
  @ViewChild(Content) content: Content;
  session: Session;
  friend: User;
  localUser: User;
  inputContent: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public tabSwitchService: TabSwitchService,
    public chatService: ChatService,
    public imgService: ImgService) {
    this.friend = navParams.get('friend');
    this.localUser = navParams.get('localUser');
    this.inputContent = "";
  }

  ionViewWillEnter() {
    this.session = this.chatService.getSession(this.friend);
  }

  ionViewCanLeave() {
    //console.log("leave chat page");
    this.tabSwitchService.switchTab(0);
  }


  submitInput() {
    this.chatService.sendMessage(this.friend, 'text', this.inputContent).then(
      (session) => {
        this.session = session;
        //console.log(this.session);
        this.inputContent = '';
        this.content.scrollToBottom(3000);
      }
    );
  }

  searchMessage() {
    this.navCtrl.push(SessionSearchPage, {
      session: this.session,
      friend: this.friend,
      localUser: this.localUser
    });
  }

  add() {

  }

  sendLoc() {
    this.navCtrl.push(MapSendLocationPage, {
      localUser: this.localUser,
      friend: this.friend,
    });
  }

  mapDetail(content) {
    //console.log(position);
    this.navCtrl.push(MapSeeDetailPage, {
      content: content,
    });
  }

  pickImg() {
    this.imgService.openImgPicker().then((urls) => {
      if (urls[0] === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        console.log(urls);
        urls.forEach(url => {
          this.chatService.sendImg(this.friend, url).then((session) => {
            this.session = session;
            this.content.scrollToBottom(3000);
          });
        });
      }
    });
  }

  takeCamera() {
    this.imgService.openCamara().then((url) => {
      if (url === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        console.log(url);
        this.chatService.sendImg(this.friend, url).then((session) => {
          this.session = session;
          this.content.scrollToBottom(3000);
        });
      }
    });
  }

  postMoment() {

  }

}
