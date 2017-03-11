import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Hitchiker page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-hitchiker',
  templateUrl: 'hitchiker.html'
})
export class HitchikerPage {

  direction : string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  searchLocation(){
    console.log(this.direction);
  }
}
