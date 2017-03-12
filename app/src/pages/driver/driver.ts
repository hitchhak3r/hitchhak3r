///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { DriverPickupPage } from '../driver-pickup/driver-pickup';
import { AngularFire } from '../../../node_modules/angularfire2'
import { IOffer } from "../../model/IOffer";
import 'rxjs/Rx';
import { Speech } from "../../speech";

declare var google;
declare var annyang;

@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {
  availableOffers: any;
  lastValues;
  position: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {
    try {
      Geolocation.getCurrentPosition()
        .then(val => this.position = val.coords)
        .then(() => this.updateOffers());
    }
    catch (ex) {
    }

    annyang.start();
    annyang.setLanguage('fr-FR');
    annyang.addCommands({
      'choisir :index': (index) => this.chooseItemFromIndex(index)
    });
    this.updateOffers();
  }

  chooseItemFromIndex(index) {
    try {
      const numIndex = Number.parseInt(index, 10);
      if (this.lastValues.length > numIndex)
        this.chooseItem(this.lastValues[numIndex]);
    }
    catch(err) {
    
    }
  }

  updateOffers() {
    this.availableOffers = this.af.database.list("/AvailableOffers").map(offers => {
      const offersWithDistance = offers
        .filter(offer => !offer.Confirmation.DriverConfirmation && !offer.Confirmation.HitchhackerConfirmation)
        .map(offer => {
          const distance = this.getHitchHikerDistance(offer);
          return {
            offer,
            distance,
            distanceDescription: distance === NaN ? "n'est pas disponible" : `${distance.toFixed(2)} km`
          };
        });

      const sortedOffersWithDistance = offersWithDistance.sort((a, b) => a.distance - b.distance);
      this.lastValues = offers;
      Speech.say("La liste des passager à été mise à jour.")

      return sortedOffersWithDistance;
    });
  }

  chooseItem(item: any) {
    this.navCtrl.push(DriverPickupPage, { offer: item, position: this.position });
    annyang.stop();
  }

  getHitchHikerDistance(item: IOffer): number {
    if (this.position && item.Hitchhacker) {
      const dest = item.Hitchhacker.GeoPosition;
      let dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(this.position.latitude, this.position.longitude),
        new google.maps.LatLng(dest.lat, dest.lng));

      return dist;
    }
    return NaN;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }
}
