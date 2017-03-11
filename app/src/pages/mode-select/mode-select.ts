import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HitchikerPage } from "../hitchiker/hitchiker";
import { DriverPage } from "../driver/driver";

/*
  Generated class for the ModeSelect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-mode-select',
  templateUrl: 'mode-select.html'
})
export class ModeSelectPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModeSelectPage');
  }

  goToHitchHikerPage(){
    this.navCtrl.push(HitchikerPage);
  }

  goToDriverPage(){
    this.navCtrl.push(DriverPage);
  }
}
