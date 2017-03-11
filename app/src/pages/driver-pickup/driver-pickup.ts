import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  availableOffers = [
    {
      Address: 'Ikea',
      Distance: '5 km'
    },
    {
      Address: 'Gallerie 4 Saison',
      Distance: '12 km'
    },
    {
      Address: 'Pizza Hutt',
      Distance: '23 km'
    },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
