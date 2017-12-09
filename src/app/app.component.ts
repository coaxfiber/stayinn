import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {PropertyListPage} from '../pages/property-list/property-list';
//import {BrokerListPage} from '../pages/broker-list/broker-list';
//import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import {AddstayinnPage} from '../pages/addstayinn/addstayinn';
//import { AlertController } from 'ionic-angular';

import { GlobalvarsProvider } from '../providers/globalvars/globalvars';
import { AdMobFree, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
 
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = WelcomePage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor( public admob: AdMobFree,public platform: Platform,public globalvars: GlobalvarsProvider, public statusBar: StatusBar, public splashScreen: SplashScreen/*,private alertCtrl: AlertController*/) {
        this.initializeApp();
         this.launchInterstitial();
        //this.presentConfirm();
        this.appMenuItems = [
            {title: 'Stay Inns', component: PropertyListPage, icon: 'home'},
            {title: 'Add Stay Inns', component: AddstayinnPage, icon: 'md-add-circle'},
            //{title: 'Brokers', component: BrokerListPage, icon: 'people'},
            //{title: 'Favorites', component: FavoriteListPage, icon: 'star'},
            //{title: 'Get Preapproved', component: WelcomePage, icon: 'checkmark-circle'},
        ];

        this.accountMenuItems = [
            {title: 'Account', component: AccountPage, icon: 'ios-contact'},
           // {title: 'Logout', component: WelcomePage, icon: 'log-out'},
        ];

        this.helpMenuItems = [
            {title: 'Featured', component: WelcomePage, icon: 'bookmark'},
            {title: 'About', component: AboutPage, icon: 'information-circle'},
        ];





    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }


    launchInterstitial() {
 
        let interstitialConfig: AdMobFreeInterstitialConfig = {
            autoShow: true,
            isTesting: true
            //id: 'ca-app-pub-1127440969430875/8807385000'
            //id: Your Ad Unit ID goes here
        };
 
        this.admob.interstitial.config(interstitialConfig);
 
        this.admob.interstitial.prepare().then(() => {
            // success
        });
 
    }
   /* presentConfirm() {
          let alert = this.alertCtrl.create({
            title: 'Fb Login',
            message: 'Stay inn Locator requires you to login to your fb account.',
            buttons: [
              {
                text: 'Close App',
                role: 'cancel',
                handler: () => {
                  this.platform.exitApp();
                }
              },
              {
                text: 'Agree',
                handler: () => {
                    
                }
              }
            ]
          });
          alert.present();
       }*/

}
