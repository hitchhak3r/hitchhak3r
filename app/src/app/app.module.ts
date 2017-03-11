import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ModeSelectPage } from "../pages/mode-select/mode-select";
import { HitchikerPage } from "../pages/hitchiker/hitchiker";
import { DriverPage } from "../pages/driver/driver";
import { DriverPickupPage } from "../pages/driver-pickup/driver-pickup";
import { WaitingForDriverPage } from "../pages/waiting-for-driver/waiting-for-driver";

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
    DriverPage,
    DriverPickupPage,
    HitchikerPage,
    ModeSelectPage,
    WaitingForDriverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DriverPage,
    DriverPickupPage,
    HitchikerPage,
    ModeSelectPage,
    WaitingForDriverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
