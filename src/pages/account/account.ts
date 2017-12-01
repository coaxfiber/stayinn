import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
userData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private facebook: Facebook) {
  	
    this.fblogin();
  }
fblogin(){
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
              this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
              });
            });

  }



}
