import {User} from './user';

export class Comment {
  constructor(public momentId: number,
              public user: User,        // 发本评论的用户
              public to: User,          // 回复的对象，若回复动态则为null
              public content: string,
              public time: number,
              public id: number
              ) {
  }
}
