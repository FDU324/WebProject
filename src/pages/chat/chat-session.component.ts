/**
 * Created by kadoufall on 2017/4/30.
 */
import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content, App} from 'ionic-angular';

import {Session} from '../../entities/session';
import {User} from '../../entities/user';
import {ChatSessionSearchPage} from './chat-session-search.component';
import {ChatMapSendLocationPage} from './chat-map-send-location.component';
import {ChatMapSeeDetailPage} from './chat-map-see-detail.component';
import {MomentNewPage} from "../moment/moment-new.component";

import {TabSwitchService} from '../../service/tab-switch.service';
import {ChatService} from '../../service/chat.service';
import {ImgService} from '../../service/img.service';

@Component({
  selector: 'page-chat-session',
  templateUrl: 'chat-session.component.html',
})


export class ChatSessionPage {
  @ViewChild(Content) content: Content;
  session: Session;
  friend: User;
  localUser: User;
  inputContent: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
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
    this.navCtrl.push(ChatSessionSearchPage, {
      session: this.session,
      friend: this.friend,
      localUser: this.localUser
    });
  }

  sendLoc() {
    this.navCtrl.push(ChatMapSendLocationPage, {
      localUser: this.localUser,
      friend: this.friend,
    });
  }

  mapDetail(content) {
    //console.log(position);
    this.navCtrl.push(ChatMapSeeDetailPage, {
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
    this.navCtrl.push(MomentNewPage, {
      type: 'single',
      friend: this.friend
    });
  }

  momentDetail(moment) {

  }

}
