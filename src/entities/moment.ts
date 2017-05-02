/**
 * Created by kadoufall on 2017/5/2.
 */

import {User} from './user';

export class Moment {
  constructor(public type: string,      // 单发还是群发
              public user: User,        // 发送该动态的用户
              public time: string,
              public location: string,
              public emotion: string,   // 心情
              public group?: string[],
              public text?: string,
              public images?: string[],
              public comments?: object,
              public likeNum?: number,) {
  }
}
