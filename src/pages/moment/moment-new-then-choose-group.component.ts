/**
 * Created by wangziheng on 2017/5/28.
 */
import {Component} from "@angular/core";
import {User} from "../../entities/user";
import {NavParams, NavController, App, ViewController} from "ionic-angular";
import {LocalUserService} from '../../service/local-user.service';
import {FriendListService} from "../../service/friend-list.service";
import {Group} from "../../entities/group";

@Component({selector: 'page-moment-new-then-choose-group', templateUrl: 'moment-new-then-choose-group.component.html'})
export class MomentNewThenChooseGroupPage {
  localUser: User;
  friendList: User[];
  tempChosenUsers: User[];
  locInfo: string[];
  emotionInfo: string[];
  type: string;
  friend: User;
  callback: any;
  groups: Group[];
  chosenGroups: Group[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public viewCtrl: ViewController,
              public localUserService: LocalUserService,
              public friendListService: FriendListService) {
    this.localUser = this.localUserService.getLocalUser();
    this.friendList = this.friendListService.getFriendList();
    this.groups = localUserService.getGroups();
    this.chosenGroups = [];
    this.tempChosenUsers = navParams.get('chosenUsers').slice();
    /*
     this.locInfo = navParams.get('locInfo');
     this.emotionInfo = navParams.get('emotionInfo');
     this.type = navParams.get('type');
     this.friend = navParams.get('friend');
     */
    this.callback = navParams.get('callback');
  }

  /*
   * 原来没有的添加，原来有的删除
   */
  addFriend(array: User[], friend: User) {
    let index = this.findByUsername(array, friend);
    if (index < 0)// has not been chosen
      array.push(friend);
    else // in the chosen array
      array.splice(index, 1);
  }

  /**
   * 原来没有的添加，遇到已有的user，不删除。
   * 为了把选择的分组里的所有人添加到选择的好友数组里，但不能删除重复的
   */
  addFriendWithoutDelete(array: User[], friend: User) {
    let index = this.findByUsername(array, friend);
    if (index < 0)// has not been chosen
      array.push(friend);
  }

  // 通过比较账号是否相等，在User数组中查找一个特定的User，返回-1表示找不到，否则返回下标
  findByUsername(array: User[], user: User) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].username === user.username)
        return i;
    }
    return -1;
  }

  // 通过比较组名是否相等，在Groups数组中查找一个特定的Group，返回-1表示找不到，否则返回下标
  findByGroupName(array: Group[], group: Group) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].groupname === group.groupname)
        return i;
    }
    return -1;
  }

  confirm() {
    for (let i = 0; i < this.chosenGroups.length; i++) {
      for (let j = 0; j < this.chosenGroups[i].members.length; j++)
        this.addFriendWithoutDelete(this.tempChosenUsers, this.chosenGroups[i].members[j]);
    }

    this.callback(this.tempChosenUsers).then(() => {
      this.navCtrl.pop();
    })
  }

  addGroup(group: Group) {
    let index = this.findByGroupName(this.chosenGroups, group);
    if (index < 0)// has not been chosen
      this.chosenGroups.push(group);
    else // in the chosen array
      this.chosenGroups.splice(index, 1);
  }
}
