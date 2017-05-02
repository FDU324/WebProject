/**
 * Created by kadoufall on 2017/5/2.
 */

import {User} from './user';

export class Moment {
  constructor(
              public type: string,      // "single","group","public"
              public user: User,        // 发送该动态的用户
              public time: string,
              public location: string,
              public emotion: string,   // 心情
              public id?: number,
              public group?: string[],
              public text?: string,
              public images?: string[],
              public comments?: object,
              public likeNum?: number,) {
  }
}
