import {Component} from '@angular/core';
import {NavParams, App, NavController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {FriendDetailPage} from '../friends/friend-detail.component';

import {CommentService} from '../../service/comment.service';
import {MomentService} from '../../service/moment.service';

import {ImageViewer} from './image-viewer.component';

@Component({
  selector: 'page-moment-zone',
  templateUrl: 'moment-zone.component.html',
})
export class MomentZonePage {
  momentList: Moment[];
  //commentList: Comment[];
  inputContent: string;
  isFooterHidden: boolean;

  currentMoment: Moment;
  commentTo: string;

  constructor(public appCtrl: App,
              public navCtrl: NavController,
              public momentService: MomentService,
              public commentService: CommentService) {
    //this.commentList = commentService.getCommentByMoment(this.moment);
    this.momentList = momentService.getMomentList();
    this.inputContent = '';
    this.commentTo = '';
    this.isFooterHidden = true;
    //this.momentList = momentService.getMomentByUser(this.user);
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

  // 根据moment获取相关的comment
  getComments(moment: Moment) {
    return this.commentService.getCommentByMoment(moment);
  }

  onSubmit() {
    console.log(this.currentMoment.id);
    console.log(this.inputContent);

    this.commentService.addComment(this.currentMoment.id, this.commentTo, this.inputContent).then((commentList) => {
      this.momentList = this.momentService.getMomentList();
      this.inputContent = "";
      this.commentTo = '';
      this.isFooterHidden = true;
    }).catch((error) =>
      console.log(error)
    );

  }

  // 发评论，关联moment，以及评论的对象to
  addComment(moment: Moment, to: string) {
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
