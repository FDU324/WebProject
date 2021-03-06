/**
 * Created by wangziheng on 2017/5/29.
 */
import {Component} from "@angular/core";
import {NavController, NavParams, App} from "ionic-angular";
import {GroupEditPage} from "./group-edit.component";

import {User} from "../../entities/user";
import {Group} from "../../entities/group";

import {LocalUserService} from "../../service/local-user.service";

@Component({
  selector: 'page-groups-detail',
  templateUrl: 'groups-detail.component.html',
})
export class GroupsDetailPage {
  localUser: User;
  groups: Group[];

  constructor(public localUserService: LocalUserService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,) {
    this.localUser = localUserService.getLocalUser();
    this.groups = localUserService.getGroups();
  }

  ionViewDidEnter() {
    this.groups = this.localUserService.getGroups();
  }

  editGroup(type, group) {
    if (type == 0) {// 0 表示新建标签
      this.navCtrl.push(GroupEditPage, {
        type: 0,
        title: '未命名',
        group: null,
        groups: this.groups,
      });
    }
    else {// 1 表示编辑现有标签
      this.navCtrl.push(GroupEditPage, {
        type: 1,
        title: group.groupname,
        group: group,
        groups: this.groups,
      });
    }
  }

  deleteGroup(group: Group) {
    let tempGroups: Group[] = this.groups.slice();
    let i: number;
    for (i = 0; i < tempGroups.length; i++) {
      if (tempGroups[i].groupname === group.groupname) {
        tempGroups.splice(i, 1);
        break;
      }
    }
    this.localUserService.updateGroups(tempGroups).then((data) => {
      if (data === 'success')
        this.groups.splice(i, 1);
    });
    //let index = this.groups.indexOf(group);
    //this.groups.splice(index,1);
  }
}
