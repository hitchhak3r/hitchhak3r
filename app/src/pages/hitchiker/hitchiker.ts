import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController } from 'ionic-angular';
import { ModalDestinationConfirmationPage } from "../modal-destination-confirmation/modal-destination-confirmation";
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';
import { Geolocation } from 'ionic-native'

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
  myOfferConfirmation: FirebaseListObservable<any>;
  myPosition;
  geoposOk = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private zone: NgZone,
              private af:AngularFire,
              private alertCtrl:AlertController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.availableOffers = af.database.list('/AvailableOffers');
    this.updateGeolocalisation();
  }

  chooseItem(item: any) {
    //Affichage d'une confirmation de deplacement
    let modal = this.modalCtrl.create(ModalDestinationConfirmationPage,{destination: item.description});
    let me = this;
    modal.onDidDismiss(data => {
      if(data) //Si on confirme que l'on veut un lift
      {
        me.pushOfferToFirebase(item);
        //TODO : ajouter les conducteurs a proximite
      }
    });
    modal.present();
  }

  alertGeolocalisation(){
    let alert = this.alertCtrl.create({
      title: "Impossible d'obtenir votre position",
      message: "Veuillez activer votre geolocalisation et redémarrer l'application",
      buttons:[{text:"Je comprends !"}]
    });
    alert.present();
  }

  pushOfferToFirebase(item :any){
    //On pousse les donnees a la DB
    let snap = this.availableOffers.push({
      Destination:{
        Geoposition:item.place_id,
        Name:item.description
      },
      Hitchhacker:{
        GeoPosition: this.myPosition,
      },
      Confirmation:{
        HitchhackerConfirmation: false,
        DriverConfirmation: false
      }
    });

    //On se hook sur notre offre
    this.myOfferConfirmation = this.af.database.list('/AvailableOffers/' + snap.key + '/Confirmation');
    this.myOfferConfirmation.$ref.on('value', (s) => {
      //Todo : gerer l'attente d'un chauffeur
    });
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

  updateGeolocalisation(){
    Geolocation.getCurrentPosition().then((resp) => {
      this.myPosition = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
      this.geoposOk = true;//Si pas de geopos, on empeche de demander un pick up
    }).catch((error) => {
      this.geoposOk = false;
    });
  }
}
