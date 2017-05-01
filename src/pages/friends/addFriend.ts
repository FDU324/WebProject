import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {User} from '../../user';

@Component({
    selector: 'page-addFriend',
   templateUrl: 'addFriend.html',
})

export class AddFriendPage {
    currentUser: User;
    username: string;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.username = '';
        this.currentUser = navParams.get('currentUser');
    }


    //***** code here
    onSubmit() {

        console.log(this.username);

    }

    
}
