import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  dismiss(){
    this.navCtrl.pop();
  }

  validate(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

}
