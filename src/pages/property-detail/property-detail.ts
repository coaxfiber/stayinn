import {Component} from '@angular/core';
import {ActionSheetController,  NavController, NavParams, ToastController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
 
@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

    property: any;
    
    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController, public admob: AdMobFree) {
        this.property = this.navParams.data;
        this.showBanner();
    }

showBanner() {
 
        let bannerConfig: AdMobFreeBannerConfig = {
            autoShow: true,
            id: 'ca-app-pub-1127440969430875/2860746143'
        };
 
        this.admob.banner.config(bannerConfig);
 
        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));
 
    }

}
