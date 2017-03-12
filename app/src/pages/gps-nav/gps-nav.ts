import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DriverPage } from "../driver/driver";

/*
  Generated class for the GpsNav page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gps-nav',
  templateUrl: 'gps-nav.html'
})
export class GpsNavPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GpsNavPage');
  }

  pickupCompleted() {
    this.navCtrl.popToRoot();
  }

}
