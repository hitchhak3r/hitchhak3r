import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import {ModeSelectPage} from "../pages/mode-select/mode-select";
import {HitchikerPage} from "../pages/hitchiker/hitchiker";
import {ModalDestinationConfirmationPage} from "../pages/modal-destination-confirmation/modal-destination-confirmation";

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
    IonicModule.forRoot(MyApp)
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
