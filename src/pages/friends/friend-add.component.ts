import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {User} from '../../entities/user';

@Component({
  selector: 'page-friend-add',
  templateUrl: 'friend-add.component.html',
})

export class FriendAddPage {
  localUser: User;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.username = '';
    this.localUser = navParams.get('localUser');
  }

  //***** code here
  onSubmit() {
    console.log(this.username);
  }


}
