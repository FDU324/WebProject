import {Component} from '@angular/core';
import {NavController, NavParams, App, AlertController, ViewController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from "../../entities/moment";
import {ChatMapSeeDetailPage} from '../chat/chat-map-see-detail.component';
import {ImageViewer} from './image-viewer.component';

import {LocalUserService} from '../../service/local-user.service';
import {ImgService} from '../../service/img.service';
import {ChatService} from "../../service/chat.service";
import {MomentService} from "../../service/moment.service";
import {MomentNewThenChooseGroupPage} from "./moment-new-then-choose-group.component";

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
  group : User[];
  inputContent: string;
  images: string[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
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
    /*
     for (let i = 0; i < 9;i++){
     this.images.push('../../assets/icon/favicon.ico');
     }
     */
  }

  /*
   ionViewWillLeave() {
   let self = this;
   if (!this.sendOrNot){
   let confirm = this.alertCtrl.create({
   title: '退出动态编辑',
   message: '!!您当前的输入将不会被保存',
   buttons: [
   {
   text: '取消',
   handler: () => {
   //console.log('Disagree clicked');
   }
   },
   {
   text: '退出',
   handler: () => {
   self.sendOrNot = true;

   }
   }
   ]
   });
   confirm.present();
   }
   if (this.sendOrNot){
   this.tabSwitchService.switchTab(0);
   }

   }
   */
  pickImg() {
    this.images = [];
    this.imgService.openImgPicker().then((urls) => {
      if (urls[0] === 'error') {
        console.log('error');
      } else {
        // TODO；上传到服务器
        console.log(urls);
        urls.forEach(url => {
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

  // 这里所有的单发和未分组，moment的group都设成了null
  // 所有moment的id都为-1，时间都为-1
  sendMoment() {
    let momentLocation = [this.position, this.address, this.nearestJunction, this.staticMapUrl];
    let momentEmotion = [this.emotionText, this.emotionValue, this.emotionIconName];

    if (this.type === 'single') {
      let moment = new Moment(this.type, this.localUser, -1, momentLocation, momentEmotion, -1, null, this.inputContent, this.images);
      // console.log(moment);
      this.chatService.sendMessage(this.friend, 'moment', moment).then(
        () => {
          this.viewCtrl.dismiss();
        }
      );
    } else if (this.type === 'group') {
      // TODO: 分组
      let moment = new Moment(this.type,this.localUser,-1,momentLocation,momentEmotion,-1,this.group,this.inputContent,this.images,null,[]);
      console.log(moment);
      this.momentService.sendMoment(moment,this.group).then(
        () => {
          this.viewCtrl.dismiss();
        }
      );
    } else {
      // public
      let moment = new Moment(this.type, this.localUser, -1, momentLocation, momentEmotion, -1, null, this.inputContent, this.images, null, []);
      console.log(moment);
      this.momentService.sendMoment(moment, null).then(
        () => {
          this.viewCtrl.dismiss();
        });
    }

  }
  // 重写生命周期函数，使得进入new-then时从栈中删除上一个页面
  ionViewDidLoad(){
    this.navCtrl.remove(this.navCtrl.length()-2);
  }

  /**
   * 选择分组的按钮事件，点击后看到所有的好友，来选择分组
   */
  pickGroup(){
    console.log("选择分组");
    this.navCtrl.push(MomentNewThenChooseGroupPage,{
      chosenUsers:this.group,
      type:this.type,
      friend:this.friend,
      locInfo:[this.position,this.address,this.nearestJunction,this.staticMapUrl],
      emotionInfo:[this.emotionText,this.emotionValue,this.emotionIconName],
      callback:this.getData
    });
  }
  getData = (g) =>
  {
    return new Promise((resolve, reject) => {
      this.group = g;
      if (this.group.length > 1)
        this.type = 'group';
      resolve();
    });
  };
}
