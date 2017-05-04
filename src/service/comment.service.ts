import { Injectable } from '@angular/core';

import {Comment} from '../entities/comment';
import {User} from '../entities/user';
import {Moment} from '../entities/moment';

import {LocalUserService} from './local-user.service';

@Injectable()
export class CommentService {
    localUser: User;
    commentDatabse: Comment[];


    constructor(public localUserService: LocalUserService) {
        this.localUser = localUserService.getLocalUser();
        this.initCommentDatabase();

    }

    initCommentDatabase() {
        this.commentDatabse = [];
        let user = new User('username--0', 'fake--0', 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');
        let comment = new Comment(5, user, '','hhhhh');

        let user1 = new User('username--1', 'fake--1', 'sdfadsfas', '../assets/icon/favicon.ico', '中国大陆');
        let comment1 = new Comment(5, user1, user1.nickname,'hhhhh');

        this.commentDatabse.push(comment);
        this.commentDatabse.push(comment1);

    }

    getCommentByMoment(moment: Moment): Comment[] {
        return this.commentDatabse.filter(item=>{
            return item.momentId === moment.id;
        });
    }

    addComment(momentId: number, to: string, content: string) {
        let comment = new Comment(momentId, this.localUser, to, content);
        this.commentDatabse.push(comment);



        let commentList = this.commentDatabse.filter(item=>{
            return item.momentId === momentId;
        });
        return Promise.resolve(commentList);
    }

}
