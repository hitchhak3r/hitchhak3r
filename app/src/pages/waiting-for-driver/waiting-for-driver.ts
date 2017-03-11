import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';

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

  snap;
  myOfferConfirmation: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    //On se hook sur notre offre
    this.snap = this.navParams.get('snap');
    this.myOfferConfirmation = this.af.database.list('/AvailableOffers/' + this.snap.key + '/Confirmation');
    this.myOfferConfirmation.$ref.on('value', (s) => {
      if(s.val().DriverConfirmation)
        console.log('Un chauffeur veut te prendre !')
        //Todo : On va se faire pickup, on propose une location !
      });
  }

  cancelSearch(){
    //On retire l'offre et on reviens en arriere
    this.myOfferConfirmation.$ref.off();
    console.log("on remove le nod " + "/AvailableOffers/" + this.snap.key);
    this.af.database.list('/AvailableOffers/' + this.snap.key).remove();
    this.navCtrl.pop();
  }

}
