import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from '../../../node_modules/angularfire2';

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

  lat: number = 0;
  lng: number = 0;
  mark: string = "";
  confirmationNodeName;
  pickupLocationNodeName;
  offerNodeName;
  myOfferDriverConfirmation: FirebaseObjectObservable<any>;
  myOfferHichhakerConfirmation: FirebaseObjectObservable<any>;
  pickupLocation;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.confirmationNodeName = this.navParams.get('confirmationNodeName');
    this.pickupLocationNodeName = this.navParams.get('pickupLocationNodeName');
    this.offerNodeName = this.navParams.get('offerNodeName');
    this.myOfferDriverConfirmation = af.database.object(this.confirmationNodeName + '/DriverConfirmation');
    this.myOfferHichhakerConfirmation = af.database.object(this.confirmationNodeName + '/HitchhackerConfirmation');

    console.log("On est ici");
    this.pickupLocation = af.database.object(this.pickupLocationNodeName, { preserveSnapshot: true });
    this.pickupLocation.subscribe( snapshot => {
      console.log(snapshot.val());
      //this.lat = snapshot.val().GeoPosition.lat;
      //this.lng = snapshot.val().GeoPosition.lng;
      //this.mark = snapshot.val().Name; 
    });
  }

  cancelPickupProposition() {
    //On supprime le lift
    this.af.database.list(this.offerNodeName).remove();
    this.navCtrl.popToRoot();
  }
}
