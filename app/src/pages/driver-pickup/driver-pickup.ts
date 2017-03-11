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


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFire) {

    this.hitchHikerPosition = navParams.get("offer").Hitchhacker.GeoPosition;
    this.pickUpLocation = af.database.list("/PickupPointLocation");

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

      var dest = new google.maps.LatLng(this.closestLocation.GeoPosition.lat, this.closestLocation.GeoPosition.lng);
      var mapOptions = {
        zoom:7,
        center: dest
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsDisplay.setMap(this.map);
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  validate() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
