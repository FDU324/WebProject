import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
//import {HttpModule} from '@angular/http';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from '../services/in-memory-data.service';

import {MyApp} from './app.component';
import {ChatTabPage} from '../pages/chat/chat-tab.component';
import {SessionPage} from '../pages/chat/session.component';
import {SessionSearchPage} from '../pages/chat/session-search.component';
import {AboutTabPage} from '../pages/about/about-tab.component';
import {FriendsTabPage} from '../pages/friends/friends-tab.component';
import {FriendAddPage} from '../pages/friends/friend-add.component';
import {FriendDetailPage} from '../pages/friends/friend-detail.component'
import {MomentTabPage} from '../pages/moment/moment-tab.component';
import {TabsPage} from '../pages/tabs/tabs';
import {MomentListPage} from '../pages/moment/moment-list.component';
import {MomentDetailPage} from '../pages/moment/moment-detail.component';


import {SighupPage} from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import {StartPage} from '../pages/start/start';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {FriendListService} from '../service/friend-list.service';
import {LocalUserService} from '../service/local-user.service';
import {ChatService} from '../service/chat.service';
import {TabSwitchService} from '../service/tab-switch.service';
import {MomentService} from '../service/moment.service';
import {CommentService} from '../service/comment.service'

@NgModule({
  declarations: [
    MyApp,
    AboutTabPage,
    FriendsTabPage,
    FriendAddPage,
    FriendDetailPage,
    MomentTabPage,
    TabsPage,
    ChatTabPage,
    SessionPage,
    SessionSearchPage,
    SighupPage,
    StartPage,
    LoginPage,
    MomentListPage,
    MomentDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutTabPage,
    FriendsTabPage,
    FriendAddPage,
    FriendDetailPage,
    MomentTabPage,
    TabsPage,
    ChatTabPage,
    SessionPage,
    SessionSearchPage,
    SighupPage,
    StartPage,
    LoginPage,
    MomentListPage,
    MomentDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FriendListService,
    LocalUserService,
    ChatService,
    TabSwitchService,
    MomentService,
    CommentService
  ]
})
export class AppModule {
}
