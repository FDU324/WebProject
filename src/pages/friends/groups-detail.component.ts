/**
 * Created by wangziheng on 2017/5/29.
 */
import {Component} from "@angular/core";
import {User} from "../../entities/user";
import {LocalUserService} from "../../service/local-user.service";
import {Group} from "../../entities/group";
import {NavController, NavParams, App} from "ionic-angular";
import {GroupEditPage} from "./group-edit.component";
@Component({
  selector: 'page-groups-detail',
  templateUrl: 'groups-detail.component.html',
  //providers:[FriendListService]
})
export class GroupsDetailPage{
  localUser:User;
  groups:Group[];
  constructor(public localUserService:LocalUserService,
              public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,){
    this.localUser = localUserService.getLocalUser();
    this.groups = localUserService.getGroups();// TODO：groups应该是从数据库中得到的
  }
  editGroup(type,group){
    if(type == 0){// 0 表示新建标签
      this.navCtrl.push(GroupEditPage,{
        type:0,
        title:'未命名',
        group:null,
        groups:this.groups,
      });
    }
    else {// 1 表示编辑现有标签
      this.navCtrl.push(GroupEditPage,{
        type:1,
        title:group.groupname,
        group:group,
        groups:this.groups,
      });
    }
  }
  deleteGroup(group){
    // TODO:在数组中删掉这个group并发送给服务器
    //let index = this.groups.indexOf(group);
    //this.groups.splice(index,1);
  }
}
