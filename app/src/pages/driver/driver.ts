///<reference path="../../../node_modules/rxjs/add/operator/map.d.ts"/>
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { DriverPickupPage } from '../driver-pickup/driver-pickup';
import { AngularFire, FirebaseListObservable } from '../../../node_modules/angularfire2'

/*
 Generated class for the Driver page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {

  availableOffers : FirebaseListObservable<any[]>;
  position : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af:AngularFire) {
    var self = this;
    try{
      Geolocation.getCurrentPosition().then(val => self.position = val.coords);
    }
    catch(ex){
    }

    this.availableOffers = af.database.list("/AvailableOffers");
  }

  chooseItem(item: any) {
    this.navCtrl.push(DriverPickupPage,{destination: item});
  }

  getHitchHikerDistance(item){
    if(this.position){
      var dest = item.Hitchhacker.GeoPosition
      var dist = google.maps.geometry.spherical.computeDistanceBetween (
        new google.maps.LatLng(this.position.latitude, this.position.longitude),
        new google.maps.LatLng(dest.lat, dest.lng));

      return dist.toFixed(2) + " km";
    }
    return "non disponible";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }
}
