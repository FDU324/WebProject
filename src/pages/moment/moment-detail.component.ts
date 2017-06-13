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
  addComment(to: User) {
    /*
    this.momentService.addComment(this.moment, to, this.inputContent).then((data) => {
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
    */
  }


}
