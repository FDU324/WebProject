import {Component} from '@angular/core';
import {NavParams, App, PopoverController} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {CommentService} from '../../service/comment.service';

import {ImageViewer} from './image-viewer.component';

@Component({
  selector: 'page-moment',
  templateUrl: 'moment.component.html',
})


export class MomentPage {

  moment: Moment;
  commentList: Comment[];
  inputContent: string;

  commentTo: string;

  constructor(public navParams: NavParams, 
              public appCtrl: App,  
              public commentService: CommentService) {
    this.moment = navParams.get('moment');
    this.commentList = commentService.getCommentByMoment(this.moment);
    this.inputContent='';
    this.commentTo = '';
    //this.momentList = momentService.getMomentByUser(this.user);
    //console.log(this.momentList);
  }

  onSubmit() {
      this.commentService.addComment(this.moment.id, this.commentTo, this.inputContent).then((commentList)=>{
          this.commentList = commentList;
          this.inputContent = '';
          this.commentTo = '';
      });   
  }

  focus() {
    //console.log(document.getElementById('ipt').getElementsByTagName('input')[0]);
    document.getElementById('ipt').getElementsByTagName('input')[0].focus();
  }

  addComment(to: string) {
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
