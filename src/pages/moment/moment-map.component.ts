import {Component} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {MomentService} from '../../service/moment.service';

import {MomentDetailComponent} from './moment-detail.component';
import {ImageViewer} from './image-viewer.component';

@Component({
  selector: 'page-moment-map',
  templateUrl: 'moment-map.component.html',
})


export class MomentMapPage {

  momentList: Moment[];
  inputContent: string;
  isFooterHidden: boolean;

  currentMoment: Moment;
  commentTo: User;

  constructor(public appCtrl: App,
              public momentService: MomentService) {
    this.momentList = momentService.getMomentList();
    this.inputContent='';
    this.commentTo = null;
    this.isFooterHidden = true;
    //console.log(this.momentList);
  }

  onSubmit() {
      console.log(this.currentMoment.id);
      console.log(this.inputContent);

    this.momentService.addComment(this.currentMoment, this.commentTo, this.inputContent).then((commentList)=>{
          this.momentList = this.momentService.getMomentList();
          this.inputContent = "";
          this.commentTo = null;
          this.isFooterHidden = true;
      }).catch(()=>
        console.log('err')
      );
  }

  addComment(moment: Moment, to: User) {
    this.currentMoment = moment;

    this.commentTo = to;
    //console.log(this.currentMoment.id);
    //console.log(this.inputContent);
    document.getElementById('ipt').getElementsByTagName('input')[0].focus();
    this.isFooterHidden = false;
  }

  hideFooter() {
      this.isFooterHidden=true;
  }

  viewImage(moment: Moment,currentIndex: number) {
    this.appCtrl.getRootNav().push(ImageViewer, {
      images: moment.images,
      currentIndex: currentIndex
    });
  }

}
