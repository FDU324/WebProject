import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {HttpModule} from '@angular/http';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from '../services/in-memory-data.service';

import {MyApp} from './app.component';
import {ChatPage} from '../pages/chat/chat';
import {ChatContentPage} from '../pages/chat/chatContent';
import {AboutPage} from '../pages/about/about';
import {FriendsPage} from '../pages/friends/friends';
import {AddFriendPage} from '../pages/friends/addFriend';
import {FriendDetailPage} from '../pages/friends/friendDetail'
import {MomentPage} from '../pages/moment/moment';
import {TabsPage} from '../pages/tabs/tabs';
import {SighupPage} from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import {StartPage} from '../pages/start/start';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {FriendListService} from '../service/friendList';
import {LocalUserService} from '../service/localUser';
import {ChatListService} from '../service/chatList';
import {TabSwitchService} from '../service/tabSwitch';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    FriendsPage,
    AddFriendPage,
    FriendDetailPage,
    MomentPage,
    TabsPage,
    ChatPage,
    ChatContentPage,
    SighupPage,
    StartPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    FriendsPage,
    AddFriendPage,
    FriendDetailPage,
    MomentPage,
    TabsPage,
    ChatPage,
    ChatContentPage,
    SighupPage,
    StartPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FriendListService,
    LocalUserService,
    ChatListService,
    TabSwitchService,
  ]
})
export class AppModule {
}
