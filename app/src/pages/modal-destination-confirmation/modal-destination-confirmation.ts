import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the ModalDestinationConfirmation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-destination-confirmation',
  templateUrl: 'modal-destination-confirmation.html'
})
export class ModalDestinationConfirmationPage {

  destination;
  geoposOk: boolean;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.destination = navParams.get('destination');
  }

  dismiss(){
    this.viewCtrl.dismiss(false);
  }

  validate(){
    this.viewCtrl.dismiss(true);
  }
}
