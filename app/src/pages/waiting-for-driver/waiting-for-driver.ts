import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';
import { ProposePickupToHichhakerPage } from "../propose-pickup-to-hichhaker/propose-pickup-to-hichhaker"

/*
  Generated class for the WaitingForDriver page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-waiting-for-driver',
  templateUrl: 'waiting-for-driver.html'
})
export class WaitingForDriverPage {

  offerNodeName
  confirmationNodeName;
  myOfferConfirmation: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    //On se hook sur notre offre
    this.offerNodeName = this.navParams.get("offerNodeName");
    this.confirmationNodeName = this.navParams.get("confirmationNodeName");
    console.log('confirmationNodeName = ' + this.confirmationNodeName)
    this.myOfferConfirmation = this.af.database.list(this.confirmationNodeName);
    this.myOfferConfirmation.$ref.on('value', (s) => {
      if(s.val().DriverConfirmation)
        //Todo : ajouter la position du pickup sur la map !
        this.navCtrl.push(ProposePickupToHichhakerPage, { confirmationNode:this.myOfferConfirmation });
      });
  }

  cancelSearch(){
    //On retire l'offre et on reviens en arriere
    this.myOfferConfirmation.$ref.off();
    this.af.database.list(this.offerNodeName).remove();
    this.navCtrl.pop();
  }

}
