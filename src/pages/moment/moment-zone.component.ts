import {Component} from '@angular/core';
import {NavParams, App, NavController, ToastController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {ImageViewer} from './image-viewer.component';
import {FriendDetailPage} from '../friends/friend-detail.component';

import {MomentService} from '../../service/moment.service';

@Component({
  selector: 'page-moment-zone',
  templateUrl: 'moment-zone.component.html',
})
export class MomentZonePage {
  momentList: Moment[];
  inputContent: string;
  isFooterHidden: boolean;

  currentMoment: Moment;
  commentTo: User;

  constructor(public appCtrl: App,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public momentService: MomentService) {
    this.momentList = momentService.getMomentList();
    this.inputContent = '';
    this.commentTo = null;
    this.isFooterHidden = true;
    console.log(this.momentList);
  }

  ionViewDidEnter() {
    this.momentService.registerPage(this);
  }

  ionViewDidLeave() {
    this.momentService.removePage(this);
  }

  // 进入用户详情页
  seeUserInfo(user: User) {
    this.navCtrl.push(FriendDetailPage, {
      friend: user,
    });
  }

  update() {
    this.momentList = this.momentService.getMomentList();
  }

  // 赞与取消赞
  changeLike(moment: Moment, from: boolean) {
    this.momentService.changeLike(moment, !from).then(data => {
      console.log(data);
    });
  }

  onSubmit() {
    console.log(this.currentMoment.id);
    console.log(this.inputContent);

    this.momentService.addComment(this.currentMoment, this.commentTo, this.inputContent).then((data) => {
      if(data === 'success'){
        this.inputContent = "";
        this.commentTo = null;
        this.isFooterHidden = true;
      }else{
        let toast = this.toastCtrl.create({
          message: '添加失败，请重试',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
        console.log('addComment error:', data);
      }
    }).catch((error) =>{
        console.log(error);
    });

  }

  // 发评论，关联moment，以及评论的对象to
  addComment(moment: Moment, to: User) {
    this.currentMoment = moment;

    this.commentTo = to;
    //console.log(this.currentMoment.id);
    //console.log(this.inputContent);
    document.getElementById('ipt').getElementsByTagName('input')[0].focus();
    this.isFooterHidden = false;
  }

  hideFooter() {
    this.isFooterHidden = true;
  }

  viewImage(moment: Moment, currentIndex: number) {
    this.appCtrl.getRootNav().push(ImageViewer, {
      images: moment.images,
      currentIndex: currentIndex
    });
  }

}
