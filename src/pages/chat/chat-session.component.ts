/**
 * Created by kadoufall on 2017/4/30.
 */
import {Component, ViewChild} from '@angular/core';
import {NavController, ViewController, NavParams, Content, App, AlertController} from 'ionic-angular';
import {NativeStorage} from '@ionic-native/native-storage';

import {Session} from '../../entities/session';
import {User} from '../../entities/user';

import {TabsPage} from '../tabs/tabs';
import {ChatSessionSearchPage} from './chat-session-search.component';
import {ChatMapSendLocationPage} from './chat-map-send-location.component';
import {ChatMapSeeDetailPage} from './chat-map-see-detail.component';
import {MomentNewPage} from "../moment/moment-new.component";
import {FriendDetailPage} from '../friends/friend-detail.component'

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
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public appCtrl: App,
              public nativeStorage: NativeStorage,
              public chatService: ChatService,
              public imgService: ImgService,
              public alertCtrl: AlertController) {
    this.friend = navParams.get('friend');
    this.localUser = navParams.get('localUser');
    this.inputContent = "";
  }

  ionViewDidLoad() {
    this.session = this.chatService.getSession(this.friend);

    // 把stack中之前的page全部删除，并将root设为tabsPage
    this.navCtrl.remove(0, this.navCtrl.length() - 1);
    this.navCtrl.insertPages(0, [{page: TabsPage, params: {tabId: 0}}]);

    this.chatService.registerPage(this);
    this.chatService.clearNewMessages(this.session);
  }

  ionViewDidLeave() {
    this.chatService.removePage(this);
    let keyName = this.localUser.username + '_' + 'session_' + this.friend.username;
    let value = JSON.stringify(this.session);

    this.nativeStorage.setItem(keyName, {data: value}).then(
      () => {
        console.log('Success storing '+keyName);
        keyName = this.localUser.username + '_totalNewMessageCount';
        this.nativeStorage.setItem(keyName, {data: this.chatService.totalNewMessageCount}).then(
          () => {
          },
          error => {
            console.log('Error storing totalNewMessageCount : ' + error);
          }
        );
      },
      error => {
        console.log('Error storing ' + keyName + ' : ' + error);
      }
    );

  }

  update() {
    this.session = this.chatService.getSession(this.friend);
    this.chatService.clearNewMessages(this.session);
    this.content.scrollToBottom(3000);
  }

  log(text: string) {
    console.log(text);
  }

  submitInput() {
    this.chatService.sendMessage(this.friend, 'text', this.inputContent).then(
      (session) => {
        if (typeof session !== 'string') {
          this.session = session;
          //console.log(this.session);
          this.inputContent = '';
          this.content.scrollToBottom(3000);
        }
        else if (session === 'refuse') {
          let alert = this.alertCtrl.create({
            title: '失败!',
            subTitle: '你还不是对方的好友，先添加对方好友才能聊天!',
            buttons: ['OK']
          });
          alert.present();
          this.inputContent = '';
        }

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
            if (typeof session !== 'string') {
              this.session = session;
              this.content.scrollToBottom(3000);
            }
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
          if (typeof session !== 'string') {
            this.session = session;

            this.content.scrollToBottom(3000);
          }
        });
      }
    });
  }

  postMoment() {
    this.navCtrl.push(MomentNewPage, {
      type: 'single',
      friend: this.friend,
      session: this.session,
      content: this.content
    });
  }

  momentDetail(moment) {

  }

  showUserDetail(userType: string) {
    let user: User;
    if (userType === 'me')
      user = this.localUser;
    else
      user = this.friend;
    this.navCtrl.push(FriendDetailPage, {
      friend: user
    });
  }

}
