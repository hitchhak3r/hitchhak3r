import { Component, NgZone } from '@angular/core';
import { AlertController, NavController, NavParams, ModalController } from 'ionic-angular';
import { WaitingForDriverPage } from "../waiting-for-driver/waiting-for-driver"
import { AngularFire, FirebaseListObservable } from '../../../node_modules/angularfire2';
import { Geolocation } from 'ionic-native'
import { ProposePickupToHichhakerPage } from "../propose-pickup-to-hichhaker/propose-pickup-to-hichhaker";

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
  myPosition;
  geoposOk = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private zone: NgZone,
    private af: AngularFire,
    private alertCtrl: AlertController) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

    this.availableOffers = af.database.list('/AvailableOffers');
    this.updateGeolocalisation();
  }

  chooseItem(item: any) {
    this.alertCtrl.create({
      title: "Je veux un lift pour " + item.description,
      buttons: [
        {
          text: "Annuler"
        },
        {
          text: "Go !",
          handler: () => {
            var snap = this.pushOfferToFirebase(item);
            var offerNodeName = '/AvailableOffers/' + snap.key;
            var confirmationNodeName = '/AvailableOffers/' + snap.key + '/Confirmation';
            var pickupLocationNodeName = '/AvailableOffers/' + snap.key + '/PickupLocation';
            var confirmation = this.af.database.list(confirmationNodeName + '/DriverConfirmation');
            var waitAlert;

            confirmation.$ref.on('value', (s) => {
              if (s.val() && s.val()) {
                //Todo : ajouter la position du pickup sur la map !
                this.navCtrl.push(ProposePickupToHichhakerPage, {
                  confirmationNodeName,
                  pickupLocationNodeName,
                  offerNodeName
                });
                waitAlert.dismiss();
              }
            });

            waitAlert = this.alertCtrl.create({
              title: "En attente d'un généreux chauffeur...",
              buttons: [
                {
                  text: "Annuler",
                  handler: () => {
                    confirmation.$ref.off();
                    this.af.database.list(offerNodeName).remove();
                  }
                }
              ]
            });
            waitAlert.present();
          }
        }]
    }).present();
  }

  alertGeolocalisation() {
    let alert = this.alertCtrl.create({
      title: "Impossible d'obtenir votre position",
      message: "Veuillez activer votre geolocalisation et redémarrer l'application",
      buttons: [{ text: "Je comprends !" }]
    });
    alert.present();
  }

  pushOfferToFirebase(item: any) {
    //On pousse les donnees a la DB
    let snap = this.availableOffers.push({
      Destination: {
        Geoposition: item.place_id,
        Name: item.description
      },
      Hitchhacker: {
        GeoPosition: this.myPosition,
      },
      Confirmation: {
        HitchhackerConfirmation: false,
        DriverConfirmation: false
      },
      PickupLocation: {}
    });
    return snap;
  }

  dismiss() {
    this.autocomplete.query = '';
    this.autocompleteItems.splice(0);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: { country: 'CA' } }, function (predictions, status) {
      me.autocompleteItems = [];
      me.zone.run(function () {
        if (predictions) {
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }

  updateGeolocalisation() {
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
