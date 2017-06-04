import {Injectable} from '@angular/core';

import {Comment} from '../entities/comment';
import {User} from '../entities/user';
import {Moment} from '../entities/moment';

import {LocalUserService} from './local-user.service';

@Injectable()
export class CommentService {
  localUser: User;
  commentDatabse: Comment[];


  constructor(public localUserService: LocalUserService) {
  }

  updateAfterLogin() {
    this.localUser = this.localUserService.getLocalUser();
    this.initCommentDatabase();
    console.log(this.commentDatabse.length);
  }

  initCommentDatabase() {
    this.commentDatabse = [];
    let user = new User('username--0', 'fake--0', '../assets/icon/favicon.ico', '北京市-北京市-东城区', []);
    let comment = new Comment(5, user, '', 'hhhhh', Date.now());

    let user1 = new User('username--1', 'fake--1', '../assets/icon/favicon.ico', '北京市-北京市-东城区', []);
    let comment1 = new Comment(5, user1, user1.nickname, 'hhhhh', Date.now());

    this.commentDatabse.push(comment);
    this.commentDatabse.push(comment1);

  }

  getCommentByMoment(moment: Moment): Comment[] {
    return this.commentDatabse.filter(item => {
      return item.momentId === moment.id;
    });
  }

  addComment(momentId: number, to: string, content: string) {
    let comment = new Comment(momentId, this.localUser, to, content, Date.now());
    this.commentDatabse.push(comment);


    let commentList = this.commentDatabse.filter(item => {
      return item.momentId === momentId;
    });
    return Promise.resolve(commentList);
  }

}
