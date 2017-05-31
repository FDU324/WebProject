/**
 * Created by wangziheng on 2017/5/29.
 */
import {Component} from "@angular/core";
import {Group} from "../../entities/group";
import {NavController, NavParams, App} from "ionic-angular";
import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {GroupEditAddPage} from "./group-edit-add.component";
@Component({
  selector: 'page-group-edit',
  templateUrl: 'group-edit.component.html',
  //providers:[FriendListService]
})
export class GroupEditPage{
  title: string;
  group: Group;
  localUser: User;
  tempGroupMembers: User[];
  type: number;
  groups: Group[];
  constructor(public localUserService:LocalUserService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,){
    this.type = this.navParams.get('type');
    this.localUser = localUserService.getLocalUser();
    this.title = this.navParams.get('title');
    this.group = this.navParams.get('group');
    this.groups = this.navParams.get('groups');
    this.tempGroupMembers = (this.group == null)?[]:this.group.members;
  }

  addUser(){
    this.navCtrl.push(GroupEditAddPage,{
      tempGroupMembers:this.tempGroupMembers,
      callback:this.getData,
    })
  }
  // 回调函数，add页面返回后，把新选择的groupmember返回
  getData = (g) =>
  {
    return new Promise((resolve, reject) => {
      this.tempGroupMembers = g;
      resolve();
    });
  };
  confirm(){
    for (let i = 0 ; i < this.groups.length ; i++){
      if (this.groups[i].groupname === this.title){
        alert("已存在相同的组名，请修改");
        return;
      }
    }
    // TODO:将tempGroupMembers和title传给服务器，作为这个分组新的members和groupname
    if (this.type == 1) {
      this.group.members = this.tempGroupMembers;
      this.group.groupname = this.title;
    }
    else {
      let t = new Group(this.title,this.tempGroupMembers);
      this.localUser.groups.push(t);
    }
    this.navCtrl.pop();
  }
}
