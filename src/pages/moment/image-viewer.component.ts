import {Component, Input} from '@angular/core';
import {NavParams, App} from 'ionic-angular';

import {User} from '../../entities/user';
import {Moment} from '../../entities/moment';
import {Comment} from '../../entities/comment';

import {CommentService} from '../../service/comment.service';

@Component({
  selector: 'moment-detail',
  template: `
            <ion-content (click)="leave()" style="background: black">
                <div style="height:100% ; width:100%;display:flex;justify-content:center;align-items:center;">
                    <img [src]="images[currentIndex]" style="width:100%" (swipeleft)="swipeLeft()" (swiperight)="swipeRight()">
                </div>
            </ion-content>
            `,
})


export class ImageViewer {
    images: string[];
    currentIndex: number;
    constructor(public appCtrl: App, public navParams: NavParams) {
        this.images = navParams.get('images');
        this.currentIndex = navParams.get('currentIndex');
    }

    // 单击图片，离开页面
    leave() {
        this.appCtrl.getRootNav().pop();
    }

    //左划屏幕
    swipeLeft() {
        console.log(this.currentIndex);
        if(this.currentIndex < this.images.length-1)
            this.currentIndex++;
        
    }

    //右划屏幕
    swipeRight() {
        console.log(this.currentIndex);
        

        if(this.currentIndex > 0)
            this.currentIndex--;   
        
    }


}
