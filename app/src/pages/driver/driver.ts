import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Driver page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html'
})
export class DriverPage {

  availableOffers;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.availableOffers = [
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
