import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';

/*
  Generated class for the ProposePickupToHichhaker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  selector: 'page-propose-pickup-to-hichhaker',
  templateUrl: 'propose-pickup-to-hichhaker.html'
})
export class ProposePickupToHichhakerPage {

  lat: number = 51.678418;
  lng: number = 7.809007;
  myOfferConfirmation: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.myOfferConfirmation = this.navParams.get('confirmationNode');
  }

  cancelLift() {
    //Todo : on passe le DriverConfirmation a faux
    //this.myOfferConfirmation.$ref.
    console.log("je refuse le lift");
  }

  acceptLift() {
    //Todo : on accepte le lift
    console.log("jaccepte le lift");
  }
}
