import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from '../../../node_modules/angularfire2'
declare var google;
/*
 Generated class for the Driver page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
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
  lat;
  lng;
  offer;


  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.offer = navParams.get("offer");
    this.hitchHikerPosition = this.offer.Hitchhacker.GeoPosition;
    this.pickUpLocation = af.database.list("/PickupPointLocation");

    /*af.database.list("/AvailableOffers/" + this.offer.$key).$ref.on("value", (snapshot) => {
      var offer = snapshot.val();

      if(!offer
        || offer.Confirmation.DriverConfirmation)
        this.dismiss();
    });*/

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

      this.lat = this.closestLocation.GeoPosition.lat;
      this.lng = this.closestLocation.GeoPosition.lng;
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  validate() {
    this.af.database.object("/AvailableOffers/" + this.offer.$key + "/Confirmation/DriverConfirmation").set(true);
    this.af.database.list("/AvailableOffers/" + this.offer.$key).push({
      PickupLocation: this.closestLocation
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
