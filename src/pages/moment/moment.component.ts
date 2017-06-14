import {Component} from '@angular/core';
import {NavParams, App, PopoverController, ToastController, ActionSheetController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {MomentService} from '../../service/moment.service';
import {LocalUserService} from '../../service/local-user.service';

import {ImageViewer} from './image-viewer.component';

@Component({
  selector: 'page-moment',
  templateUrl: 'moment.component.html',
})


export class MomentPage {

  moment: Moment;
  inputContent: string;

  commentTo: User;

  constructor(public navParams: NavParams,
              public appCtrl: App,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public localUserService: LocalUserService,
              public momentService: MomentService) {
    this.moment = navParams.get('moment');
    this.inputContent = '';
    this.commentTo = null;
  }

  ionViewDidEnter() {
    this.momentService.registerPage(this);
  }

  ionViewDidLeave() {
    this.momentService.removePage(this);
  }

  update() {
    this.moment = this.momentService.getMomentById(this.moment.id);
  }

  onSubmit() {
    this.momentService.addComment(this.moment, this.commentTo, this.inputContent).then((data) => {
      if (data === 'success') {
        this.inputContent = "";
        this.commentTo = null;
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

  commentOpe(comment: Comment) {
    // 只能删除自己的评论
    if(comment.user.username === this.localUserService.localUser.username){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: '删除',
            role: 'destructive',
            handler: () => {
              this.deleteComment(this.moment, comment);
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

  focus() {
    //console.log(document.getElementById('ipt').getElementsByTagName('input')[0]);
    document.getElementById('ipt').getElementsByTagName('input')[0].focus();
  }

  addComment(to: User) {
    this.commentTo = to;
    focus();
  }

  viewImage(currentIndex: number) {
    this.appCtrl.getRootNav().push(ImageViewer, {
      images: this.moment.images,
      currentIndex: currentIndex
    });
  }


}
