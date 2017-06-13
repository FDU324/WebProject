import {Component, Input} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {MomentService} from '../../service/moment.service';

@Component({
  selector: 'moment-detail',
  templateUrl: 'moment-detail.component.html',
})


export class MomentDetailComponent {

  @Input() moment: Moment;

  constructor(public momentService: MomentService) {
  }

  // TODO
  addComment(momontId: number, to: User) {

  }


}
