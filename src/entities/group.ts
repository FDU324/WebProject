import {User} from "./user";
/**
 * Created by wangziheng on 2017/5/29.
 */
export class Group{
  constructor(public groupname: string,
              public members: User[]){

  }
}
