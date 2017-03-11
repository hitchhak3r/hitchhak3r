import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {ModeSelectPage} from "../pages/mode-select/mode-select";
import {HitchikerPage} from "../pages/hitchiker/hitchiker";
import {ModalDestinationConfirmationPage} from "../pages/modal-destination-confirmation/modal-destination-confirmation";

// Import the AF2 Module
import { AngularFireModule } from '../../node_modules/angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBUb4yu1BZCftVuVNUtxJDiLSQVrtILq2Q",
  authDomain: "hichhak3r.firebaseapp.com",
  databaseURL: "https://hichhak3r.firebaseio.com",
  storageBucket: "hichhak3r.appspot.com",
  messagingSenderId: "12232969176"
};

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ModalDestinationConfirmationPage,
    // DriverPage,
    HitchikerPage,
    ModeSelectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ModalDestinationConfirmationPage,
    // DriverPage,
    HitchikerPage,
    ModeSelectPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
