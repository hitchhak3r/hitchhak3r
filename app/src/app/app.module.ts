import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ModeSelectPage } from "../pages/mode-select/mode-select";
import { HitchikerPage } from "../pages/hitchiker/hitchiker";
import { DriverPage } from "../pages/driver/driver";
import { DriverPickupPage } from "../pages/driver-pickup/driver-pickup";
import { ModalDestinationConfirmationPage } from "../pages/modal-destination-confirmation/modal-destination-confirmation";

@NgModule({
  declarations: [
    MyApp,
    DriverPage,
    DriverPickupPage,
    ModalDestinationConfirmationPage,
    HitchikerPage,
    ModeSelectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DriverPage,
    DriverPickupPage,
    ModalDestinationConfirmationPage,
    HitchikerPage,
    ModeSelectPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
