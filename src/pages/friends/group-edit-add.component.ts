/**
 * Created by wangziheng on 2017/5/30.
 */
import {Component} from "@angular/core";
import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {NavController, NavParams, App} from "ionic-angular";
import {FriendListService} from "../../service/friend-list.service";
import {MomentNewThenChooseGroupPage} from "../moment/moment-new-then-choose-group.component";

@Component({
  selector: 'page-group-edit-add',
  templateUrl: 'group-edit-add.component.html',
  //providers:[FriendListService]
})

export class GroupEditAddPage {
  localUser: User;
  friendList: User[];
  tempGroupMembers: User[];
  callback: any;
  currentAddedMembers: User[];// 储存临时的成员，当不点击确定而是点击返回按钮时，对原来的数组不产生影响

  constructor(public localUserService: LocalUserService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public friendListService: FriendListService) {
    this.localUser = localUserService.getLocalUser();
    this.friendList = friendListService.getFriendList();
    this.tempGroupMembers = this.navParams.get('tempGroupMembers');
    this.callback = this.navParams.get('callback');
    this.currentAddedMembers = this.tempGroupMembers.slice();
  }

  // 通过比较账号是否相等，在User数组中查找一个特定的User，返回-1表示找不到，否则返回下标
  findByUsername(array: User[], user: User) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].username === user.username)
        return i;
    }
    return -1;
  }

  addIntoGroup(friend: User) {
    let index = this.findByUsername(this.currentAddedMembers, friend);
    if (index < 0) // has not been before
      this.currentAddedMembers.push(friend);
    else // in the chosen froup
      this.currentAddedMembers.splice(index, 1);
  }

  confirm() {
    this.tempGroupMembers = this.currentAddedMembers;
    this.callback(this.tempGroupMembers).then(() => {
      this.navCtrl.pop();
    })
  }
}
