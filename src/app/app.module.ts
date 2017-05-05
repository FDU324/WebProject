import {CityPickerModule} from  "ionic2-city-picker";
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from '../services/in-memory-data.service';

import {MyApp} from './app.component';
import {SighupPage} from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import {StartPage} from '../pages/start/start';
import {TabsPage} from '../pages/tabs/tabs';

import {AboutTabPage} from '../pages/about/about-tab.component';
import {UserInfoPage} from "../pages/about/user-info.component";

import {ChatTabPage} from '../pages/chat/chat-tab.component';
import {SessionPage} from '../pages/chat/session.component';
import {MapSeeDetailPage} from '../pages/chat/map-see-detail.component';
import {MapSendLocationPage} from '../pages/chat/map-send-location.component';
import {SessionSearchPage} from '../pages/chat/session-search.component';

import {FriendsTabPage} from '../pages/friends/friends-tab.component';
import {FriendAddPage} from '../pages/friends/friend-add.component';
import {FriendDetailPage} from '../pages/friends/friend-detail.component'

import {MomentTabPage} from '../pages/moment/moment-tab.component';
import {MomentListPage} from '../pages/moment/moment-list.component';
import {MomentNewPage} from '../pages/moment/moment-new.component';
import {MomentNewThenPage} from '../pages/moment/moment-new-then.component';
import {MomentDetailComponent} from '../pages/moment/moment-detail.component';
import {MomentPage} from '../pages/moment/moment.component';
import {MomentZonePage} from '../pages/moment/moment-zone.component';
import {ImageViewer} from '../pages/moment/image-viewer.component';

import {FriendListService} from '../service/friend-list.service';
import {LocalUserService} from '../service/local-user.service';
import {ChatService} from '../service/chat.service';
import {TabSwitchService} from '../service/tab-switch.service';
import {MomentService} from '../service/moment.service';
import {CommentService} from '../service/comment.service'
import {ImgService} from '../service/img.service'
import {NicknameChangePage} from "../pages/about/nickname-change.component";
import {CityPickerService} from "../service/city-picker.service";

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
    MapSendLocationPage,
    MapSeeDetailPage,
    SighupPage,
    StartPage,
    LoginPage,
    UserInfoPage,
    MomentListPage,
    MomentNewPage,
    MomentNewThenPage,
    NicknameChangePage,
    MomentDetailComponent,
    MomentPage,
    MomentZonePage,
    ImageViewer,
    MomentNewPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CityPickerModule,
    HttpModule,
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
    MapSendLocationPage,
    MapSeeDetailPage,
    SighupPage,
    StartPage,
    LoginPage,
    UserInfoPage,
    MomentListPage,
    MomentNewPage,
    MomentNewThenPage,
    NicknameChangePage,
    MomentDetailComponent,
    MomentPage,
    MomentZonePage,
    ImageViewer
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FriendListService,
    LocalUserService,
    ChatService,
    TabSwitchService,
    CityPickerService,
    MomentService,
    CommentService,
    ImgService
  ]
})
export class AppModule {
}
