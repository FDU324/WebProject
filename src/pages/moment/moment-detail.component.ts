import {Component, Input} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'moment-detail',
  templateUrl: 'moment-detail.component.html',
})


export class MomentDetailComponent {

  @Input() moment: Moment;
  @Input() commentList: Comment[];

  constructor(public commentService: CommentService) {
  }

  addComment(momontId: number, to: string) {
    
  }


}
