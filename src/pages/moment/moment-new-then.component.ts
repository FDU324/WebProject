import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, App, ViewController, ToastController, Content} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from "../../entities/moment";
import {Session} from '../../entities/session';
import {ChatMapSeeDetailPage} from '../chat/chat-map-see-detail.component';
import {ImageViewer} from './image-viewer.component';
import {MomentNewThenChooseGroupPage} from "./moment-new-then-choose-group.component";

import {LocalUserService} from '../../service/local-user.service';
import {ImgService} from '../../service/img.service';
import {ChatService} from "../../service/chat.service";
import {MomentService} from "../../service/moment.service";

/**
 * 在选定位置和心情后，选择动态内容或图片，以及分组
 * TODO: 在Android机上的硬件返回键处理
 */
@Component({selector: 'page-moment-new-then', templateUrl: 'moment-new-then.component.html'})
export class MomentNewThenPage {
  localUser: User;
  type: string;
  friend: User;
  // 位置信息
  position: string;
  address: string;
  nearestJunction: string;
  staticMapUrl: string;
  // 心情信息
  emotionText: string;
  emotionValue: string;
  emotionIconName: string;
  //  分组信息
  group: User[];
  inputContent: string;
  images: string[];
  // 聊天信息，因为单独给好友发朋友圈要刷新session
  content: Content;
  session: Session;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public viewCtrl: ViewController,
              public toastCtrl: ToastController,
              public localUserService: LocalUserService,
              public imgService: ImgService,
              public momentService: MomentService,
              public chatService: ChatService) {
    this.localUser = localUserService.getLocalUser();
    this.type = navParams.get('type');
    this.friend = navParams.get('friend');

    this.position = navParams.get('locInfo')[0];
    this.address = navParams.get('locInfo')[1];
    this.nearestJunction = navParams.get('locInfo')[2];
    this.staticMapUrl = navParams.get('locInfo')[3];

    this.emotionText = navParams.get('emotionInfo')[0];
    this.emotionValue = navParams.get('emotionInfo')[1];
    this.emotionIconName = navParams.get('emotionInfo')[2];

    this.inputContent = '';
    this.images = [];

    this.group = [];
    this.content = navParams.get('content') || null;
    this.session = navParams.get('session') || null;
    /*
     for (let i = 0; i < 9;i++){
     this.images.push('../../assets/icon/favicon.ico');
     }
     */
  }

  // 重写生命周期函数，使得进入new-then时从栈中删除上一个页面
  ionViewDidLoad() {
    this.navCtrl.remove(this.navCtrl.length() - 2);
  }
  pickImg() {
    this.images = [];
    this.imgService.openImgPicker().then((urls) => {
      if (urls[0] === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        console.log(urls);
        urls.forEach(url => {
          console.log("图片选择"+url);
          this.images.push(url);
        });
      }
    });
  }
  viewImage(images, index) {
    this.navCtrl.push(ImageViewer, {
      images: this.images,
      currentIndex: index
    });
  }

  mapDetail() {
    this.navCtrl.push(ChatMapSeeDetailPage, {
      content: [this.position, this.address, this.nearestJunction],
    });
  }

  // 所有moment的id都为-1，时间都为-1
  sendMoment() {
    let momentLocation = [this.position, this.address, this.nearestJunction, this.staticMapUrl];
    let momentEmotion = [this.emotionText, this.emotionValue, this.emotionIconName];

    if (this.type === 'single') {
      let moment = new Moment(this.type, this.localUser, -1, momentLocation, momentEmotion, -1, [], this.inputContent, this.images);
      // console.log(moment);
      this.chatService.sendMessage(this.friend, 'moment', moment).then(
        (session) => {
          if (typeof session !== 'string') {
            this.session = session;
            this.content.scrollToBottom(9000);
            this.viewCtrl.dismiss();
          }
        }
      );
    } else if (this.type === 'group') {
      let moment = new Moment(this.type, this.localUser, -1, momentLocation, momentEmotion, -1, this.group, this.inputContent, this.images, null, []);
      console.log(moment);
      this.momentService.sendMoment(moment).then(
        (data) => {
          console.log("this" + data);
          if (data === 'success') {
            this.viewCtrl.dismiss();
          } else {
            let toast = this.toastCtrl.create({
              message: '修改失败，请重试',
              duration: 1500,
              position: 'middle'
            });
            toast.present();
          }
        }
      );
    } else {
      // public
      let moment = new Moment(this.type, this.localUser, -1, momentLocation, momentEmotion, -1, [], this.inputContent, this.images, null, []);
      console.log(moment);
      this.momentService.sendMoment(moment).then(
        (data) => {
          console.log("this" + data);
          if (data === 'success') {
            this.viewCtrl.dismiss();
          } else {
            let toast = this.toastCtrl.create({
              message: '发送失败，请重试',
              duration: 1500,
              position: 'middle'
            });
            toast.present();
          }
        });
    }
  }


  /**
   * 选择分组的按钮事件，点击后看到所有的好友，来选择分组
   */
  pickGroup() {
    console.log("选择分组");
    this.navCtrl.push(MomentNewThenChooseGroupPage, {
      chosenUsers: this.group,
      type: this.type,
      friend: this.friend,
      locInfo: [this.position, this.address, this.nearestJunction, this.staticMapUrl],
      emotionInfo: [this.emotionText, this.emotionValue, this.emotionIconName],
      callback: this.getData
    });
  }

  getData = (g) => {
    return new Promise((resolve, reject) => {
      this.group = g;
      if (this.group.length > 1)
        this.type = 'group';
      resolve();
    });
  };
}
