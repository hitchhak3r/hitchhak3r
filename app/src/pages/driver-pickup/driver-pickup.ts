import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2';
import {ModeSelectPage} from '../mode-select/mode-select';

declare var google;
declare var window;

@Component({
  selector: 'page-driver-pickup',
  templateUrl: 'driver-pickup.html'
})
export class DriverPickupPage {

  pickUpLocation: FirebaseListObservable<any>;
  hitchHikerPosition;
  directionsDisplay;
  map;
  closestLocation;
  destlat;
  destlng;
  mylng;
  mylat;
  offer;
  name;
  fitBounds;
  zoom;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.offer = navParams.get("offer");
    this.hitchHikerPosition = this.offer.Hitchhacker.GeoPosition;
    this.pickUpLocation = af.database.list("/PickupPointLocation");

    af.database.list("/AvailableOffers/" + this.offer.$key).$ref.on("value", (snapshot) => {
      var offer = snapshot.val();

      if(!offer
        || offer.Confirmation.DriverConfirmation)
        this.dismiss();
    });

    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.pickUpLocation.$ref.once("value").then((locations) => {
      let closestDistance;
      let hikerPos = new google.maps.LatLng(this.hitchHikerPosition.lat, this.hitchHikerPosition.lng)
      let values = locations.val();

      for(let key in values){
        var location = values[key];
        let dist = google.maps.geometry.spherical.computeDistanceBetween(
          hikerPos,
          new google.maps.LatLng(location.GeoPosition.lat, location.GeoPosition.lng));

        if (!closestDistance || dist < closestDistance) {
          closestDistance = dist;
          this.closestLocation = location;
        }
      }
      this.name = this.closestLocation.Name;
      this.destlat = this.closestLocation.GeoPosition.lat;
      this.destlng = this.closestLocation.GeoPosition.lng;
      this.mylng = this.navParams.get('position').longitude;
      this.mylat = this.navParams.get('position').latitude;
      this.fitBounds = new google.maps.LatLngBounds();
      this.fitBounds.extend(new google.maps.LatLng(this.mylat, this.mylng));
      this.fitBounds.extend(new google.maps.LatLng(this.destlat, this.destlng));
      this.zoom = 12;
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  validate() {
    this.af.database.object("/AvailableOffers/" + this.offer.$key + "/Confirmation/DriverConfirmation").set(true);
    this.af.database.object("/AvailableOffers/" + this.offer.$key + "/PickupLocation").set(this.closestLocation);
    window.location = `geo:${this.mylng},${this.mylat};u=35`;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
