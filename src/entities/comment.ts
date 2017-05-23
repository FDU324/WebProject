import {User} from './user';

export class Comment {
  constructor(public momentId: number,
              public user: User,    // me friend
              public to: string,    
              public content: string,    
              public time: number,
              public comments?: Comment[]
              ) {
  }
} 