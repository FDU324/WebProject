import {User} from './user';

export class Comment {
  constructor(public momentId: number,
              public user: User,    // me friend
              public to: string,    // 评论好友或者动态，空字符串为评论动态
              public content: string,    // text, images, maps-locations, momennt
              ) {
  }
} 