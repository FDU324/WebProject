/**
 * Created by wangziheng on 2017/5/28.
 */
import {Component} from "@angular/core";
import {User} from "../../entities/user";
import {NavParams, NavController, App, ViewController} from "ionic-angular";
import {LocalUserService} from '../../service/local-user.service';
import {FriendListService} from "../../service/friend-list.service";
@Component({selector: 'page-moment-new-then-choose-group', templateUrl: 'moment-new-then-choose-group.component.html'})

export class MomentNewThenChooseGroupPage {
  localUser: User;
  friendList: User[];
  chosenGroup: User[];
  locInfo:string[];
  emotionInfo:string[];
  type:string;
  friend:User;
  callback:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public viewCtrl: ViewController,
              public localUserService: LocalUserService,
              public friendListService: FriendListService){
    this.localUser = this.localUserService.getLocalUser();
    this.friendList = this.friendListService.getFriendList();
    this.chosenGroup = navParams.get('chosenGroup');
    /*
    this.locInfo = navParams.get('locInfo');
    this.emotionInfo = navParams.get('emotionInfo');
    this.type = navParams.get('type');
    this.friend = navParams.get('friend');
    */
    this.callback = navParams.get('callback');
  }
  addFriend(friend:User){
    let index = this.findByUsername(this.chosenGroup,friend);
    if (index < 0)// has not been chosen
      this.chosenGroup.push(friend);
    else // in the chosen froup
      this.chosenGroup.splice(index,1);
  }
  // 通过比较账号是否相等，在User数组中查找一个特定的User，返回-1表示找不到，否则返回下标
  findByUsername(array:User[] , user:User){
    for (let i = 0 ; i < array.length ; i++){
      if (array[i].username === user.username)
        return i;
    }
    return -1;
  }
  confirm(){
    this.callback(this.chosenGroup).then(()=>{
      this.navCtrl.pop();
    })
  }
}
