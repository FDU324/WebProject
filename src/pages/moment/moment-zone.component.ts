import {Component} from '@angular/core';
import {NavParams, App, NavController, ToastController, ActionSheetController,AlertController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {FriendDetailPage} from '../friends/friend-detail.component';

import {MomentService} from '../../service/moment.service';
import {ImageViewer} from './image-viewer.component';
import {LocalUserService} from "../../service/local-user.service";
@Component({
  selector: 'page-moment-zone',
  templateUrl: 'moment-zone.component.html',
})
export class MomentZonePage {
  momentList: Moment[];
  inputContent: string;
  isFooterHidden: boolean;
  localUser: User;
  currentMoment: Moment;
  commentTo: User;

  constructor(public appCtrl: App,
              public navCtrl: NavController,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public momentService: MomentService,
              public localUserService: LocalUserService,
              public alertCtrl: AlertController) {
    this.momentList = momentService.getMomentList();
    this.inputContent = '';
    this.commentTo = null;
    this.isFooterHidden = true;
    this.localUser = localUserService.getLocalUser();
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
  showConfirm(moment: Moment) {
    let confirm = this.alertCtrl.create({
      title: '确认删除',
      message: '你确认删除该条动态吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '删除',
          handler: () => {
            this.deleteMoment(moment);
          }
        },
      ]
    });
    confirm.present();
  }
  deleteMoment(moment: Moment){
    this.momentService.deleteMoment(moment).then(data => {
      if (data === 'success'){
        // do nothing
      }
      else {
        let toast = this.toastCtrl.create({
          message: '删除失败，请重试',
          duration: 1500,
          position: 'middle'
        });
        toast.present();
        console.log('deleteMoment error:', data);
      }
    })
    console.log("删除动态");
  }
  // 赞与取消赞
  changeLike(moment: Moment, from: boolean) {
    this.momentService.changeLike(moment, !from).then(data => {
      console.log(data);
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

  onSubmit() {
    console.log(this.currentMoment.id);
    console.log(this.inputContent);

    this.momentService.addComment(this.currentMoment, this.commentTo, this.inputContent).then((data) => {
      if (data === 'success') {
        this.inputContent = "";
        this.commentTo = null;
        this.isFooterHidden = true;
      } else {
        let toast = this.toastCtrl.create({
          message: '添加失败，请重试',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
        console.log('addComment error:', data);
      }
    }).catch((error) => {
      console.log(error);
    });

  }

  commentOpe(moment: Moment, comment: Comment) {
    // 只能删除自己的评论
    if(comment.user.username === this.localUserService.localUser.username){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '删除',
            role: 'destructive',
            handler: () => {
              this.deleteComment(moment, comment);
            }
          }, {
            text: '取消',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  deleteComment(moment: Moment, comment: Comment) {
    console.log('deleteComment');
    this.momentService.deleteComment(moment, comment).then(data => {
      if (data === 'success') {
        // do nothing
      } else {
        let toast = this.toastCtrl.create({
          message: '删除失败，请重试',
          duration: 1500,
          position: 'middle'
        });

        toast.present();
        console.log('addComment error:', data);
      }
    });
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
