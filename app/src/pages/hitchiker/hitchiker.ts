import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {ModalDestinationConfirmationPage} from "../modal-destination-confirmation/modal-destination-confirmation";
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';

/*
  Generated class for the Hitchiker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;

@Component({
  selector: 'page-hitchiker',
  templateUrl: 'hitchiker.html'
})
export class HitchikerPage {
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();
  availableOffers: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private zone: NgZone,
              private af:AngularFire) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.availableOffers = af.database.list('/AvailableOffers');
    //On recupere la localisation de l'appareil
  }

  chooseItem(item: any) {
    //Affichage d'une confirmation de deplacement
    let modal = this.modalCtrl.create(ModalDestinationConfirmationPage,{destination: item.description});
    let me = this;
    modal.onDidDismiss(data => {
      console.log(data)
      if(data) //Si on confirme que l'on veut un lift
      {
        //On pousse les donnees a la DB


        //On attend un pickup
      }
    });
    modal.present();
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'CA'} }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if(predictions){
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }
}
