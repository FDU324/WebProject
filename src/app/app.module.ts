import {CityPickerModule} from  "ionic2-city-picker";
import {HttpModule} from '@angular/http';
import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Transfer,FileUploadOptions, TransferObject} from "@ionic-native/transfer";
import {NativeStorage} from '@ionic-native/native-storage';

import {MockStorage} from '../mockNative/mock-storage';

import {MyApp} from './app.component';
import {SighupPage} from '../pages/signup/signup';
import {LoginPage} from '../pages/login/login';
import {ChangePasswordPage} from '../pages/login/change-password.component';
import {StartPage} from '../pages/start/start';
import {TabsPage} from '../pages/tabs/tabs';

import {AboutTabPage} from '../pages/about/about-tab.component';
import {AboutUserInfoPage} from "../pages/about/about-user-info.component";
import {AboutNicknameChangePage} from "../pages/about/about-nickname-change.component";

import {ChatTabPage} from '../pages/chat/chat-tab.component';
import {ChatSessionPage} from '../pages/chat/chat-session.component';
import {ChatMapSeeDetailPage} from '../pages/chat/chat-map-see-detail.component';
import {ChatMapSendLocationPage} from '../pages/chat/chat-map-send-location.component';
import {ChatSessionSearchPage} from '../pages/chat/chat-session-search.component';

import {FriendsTabPage} from '../pages/friends/friends-tab.component';
import {FriendAddPage} from '../pages/friends/friend-add.component';
import {FriendDetailPage} from '../pages/friends/friend-detail.component';
import {FriendMapPage} from '../pages/friends/friend-map.component';
import {GroupsDetailPage} from '../pages/friends/groups-detail.component';
import {GroupEditPage} from '../pages/friends/group-edit.component';
import {GroupEditAddPage} from '../pages/friends/group-edit-add.component';
import {MomentsAreaPage} from '../pages/friends/moments-area.component'
import {FriendReqPage} from '../pages/friends/friend-request.component'

import {MomentTabPage} from '../pages/moment/moment-tab.component';
import {MomentListPage} from '../pages/moment/moment-list.component';
import {MomentNewPage} from '../pages/moment/moment-new.component';
import {MomentNewThenPage} from '../pages/moment/moment-new-then.component';
import {MomentNewThenChooseGroupPage} from "../pages/moment/moment-new-then-choose-group.component";
import {MomentPage} from '../pages/moment/moment.component';
import {MomentZonePage} from '../pages/moment/moment-zone.component';
import {ImageViewer} from '../pages/moment/image-viewer.component';

import {FriendListService} from '../service/friend-list.service';
import {LocalUserService} from '../service/local-user.service';
import {ChatService} from '../service/chat.service';
import {MomentService} from '../service/moment.service';
import {ImgService} from '../service/img.service'
import {SignupLoginService} from '../service/signup-login.service'
import {SocketService} from '../service/socket.service'
import {CityPickerService} from "../service/city-picker.service";
import {MyDatePipe} from './my-date.pipe';

@NgModule({
  declarations: [
    MyDatePipe,
    MyApp,
    TabsPage,
    SighupPage,
    StartPage,
    LoginPage,
    ChangePasswordPage,
    AboutTabPage,
    AboutUserInfoPage,
    AboutNicknameChangePage,
    FriendsTabPage,
    FriendAddPage,
    FriendDetailPage,
    FriendMapPage,
    GroupsDetailPage,
    GroupEditPage,
    GroupEditAddPage,
    FriendReqPage,
    MomentsAreaPage,
    ChatTabPage,
    ChatSessionPage,
    ChatSessionSearchPage,
    ChatMapSendLocationPage,
    ChatMapSeeDetailPage,
    MomentTabPage,
    MomentListPage,
    MomentNewPage,
    MomentNewThenPage,
    MomentNewThenChooseGroupPage,
    MomentPage,
    MomentZonePage,
    MomentNewPage,
    ImageViewer,
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
    TabsPage,
    SighupPage,
    StartPage,
    LoginPage,
    ChangePasswordPage,
    AboutTabPage,
    AboutUserInfoPage,
    AboutNicknameChangePage,
    FriendsTabPage,
    FriendAddPage,
    FriendDetailPage,
    FriendMapPage,
    GroupsDetailPage,
    GroupEditPage,
    GroupEditAddPage,
    FriendReqPage,
    MomentsAreaPage,
    ChatTabPage,
    ChatSessionPage,
    ChatSessionSearchPage,
    ChatMapSendLocationPage,
    ChatMapSeeDetailPage,
    MomentTabPage,
    MomentListPage,
    MomentNewPage,
    MomentNewThenPage,
    MomentNewThenChooseGroupPage,
    MomentPage,
    MomentZonePage,
    ImageViewer,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FriendListService,
    LocalUserService,
    ChatService,
    CityPickerService,
    MomentService,
    ImgService,
    SignupLoginService,
    SocketService,
    Transfer,
    {provide: NativeStorage, useClass: MockStorage}
  ]
})
export class AppModule {
}
