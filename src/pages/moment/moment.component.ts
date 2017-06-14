import {Component} from '@angular/core';
import {NavParams, App, PopoverController, ToastController, AlertController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {MomentService} from '../../service/moment.service';

import {ImageViewer} from './image-viewer.component';
import {LocalUserService} from "../../service/local-user.service";

@Component({
  selector: 'page-moment',
  templateUrl: 'moment.component.html',
})


export class MomentPage {

  moment: Moment;
  inputContent: string;
  localUser: User;
  commentTo: User;

  constructor(public navParams: NavParams,
              public appCtrl: App,
              public toastCtrl: ToastController,
              public momentService: MomentService,
              public localUserService: LocalUserService,
              public alertCtrl: AlertController) {
    this.moment = navParams.get('moment');
    this.inputContent = '';
    this.commentTo = null;
    this.localUser = localUserService.getLocalUser();
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

}
