/**
 * Created by kadoufall on 2017/5/2.
 */

import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Session} from "../../entities/session";
import {Message} from "../../entities/message";
import {User} from "../../entities/user";

@Component({
  selector: 'page-session-search',
  templateUrl: 'session-search.component.html',
})
export class SessionSearchPage {
  session: Session;
  searchMessage: Message[];
  localUser: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,) {
    this.session = this.navParams.get('session');
    this.localUser = navParams.get('localUser');
    this.searchMessage = [];
  }

  searchMessages(ev) {
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this.searchMessage = this.session.messageList.filter((item) => {
        return (item.type === 'text' && item.content.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.searchMessage = [];
    }
  }

}

