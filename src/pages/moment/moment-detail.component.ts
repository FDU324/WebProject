import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'page-moment-detail',
  templateUrl: 'moment-detail.component.html',
})


export class MomentDetailPage {

  moment: Moment;
  commentList: Comment[];
  inputContent: string;

  constructor(public navParams: NavParams, public appCtrl: App, public commentService: CommentService) {
    this.moment = navParams.get('moment');
    this.commentList = commentService.getCommentByMoment(this.moment);
    this.inputContent='';
    //this.momentList = momentService.getMomentByUser(this.user);
    //console.log(this.momentList);
  }

  onSubmit() {

  }

  addComment(momontId: number, to: string) {
    
  }


}
