/**
 * Created by kadoufall on 2017/5/2.
 */

import {User} from './user';
import {Comment} from './comment';

export class Moment {
  constructor(public type: string,      // "single","group","public"
              public user: User,        // 发送该动态的用户
              public time: number,
              public location: string[],    // 位置    ['经纬度', '地址', '最近的路口'，'静态地图url']
              public emotion: string[],   // 心情    ['text','value','iconName']
              public id?: number,
              public group?: User[],
              public text?: string,
              public images?: string[],
              public comments?: Comment[],
              public likeuser?: User[],
              public like?: boolean,      // 只用于前端标记
  ) {
  }
}
