import {Component} from '@angular/core';
import {Config, NavController} from 'ionic-angular';
import {PropertyService} from '../../providers/property-service-mock';
import {PropertyDetailPage} from '../property-detail/property-detail';
import leaflet from 'leaflet';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'page-property-list',
    templateUrl: 'property-list.html'
})
export class PropertyListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    map;
    markersGroup;
    constructor(public navCtrl: NavController, public service: PropertyService, public config: Config,private http:Http) {


     this.http.get('http://pmt.i-tugue.com/stayinn-backend/api.php?action=get_app_list')
          .map(response => response.json())
          .subscribe(res => this.properties = res);
          this.findAll();
    }
        



    openPropertyDetail(property: any) {
        this.navCtrl.push(PropertyDetailPage, property);
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
            
    }
    

    onCancel(event) {
        this.findAll();
    }

    findAll() {

        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));


    }

    showMap() {

      

        setTimeout(() => {
            this.map = leaflet.map("map").setView([17.610569, 121.730092], 12);
            leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; techventures.ph'
            }).addTo(this.map);
            this.showMarkers();
            this.map.locate({setView: false, maxZoom: 12});
            
            this.map.on('locationfound', e => {
                var radius = e.accuracy / 2;
                var popup = leaflet.popup();
                popup
              .setLatLng(e.latlng)
              .setContent("You are currently here!")
              .openOn(this.map); 
            
            leaflet.circle(e.latlng, radius).addTo(this.map);
             
           });

            function onLocationError(e) {
     
                }
       this.map.on('locationerror', onLocationError);
                        })

}

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.properties.forEach(property => {
            if (property.lat, property.long) {
                var LeafIcon = leaflet.Icon.extend({
                    options: {
                        iconSize:     [24, 33]
                    }
                });
                var flag = new LeafIcon({iconUrl: 'assets/leaflet/images/marker-icon.png'});
                if (property.type=='Hotel') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/hotelflag.png'});
                }if (property.type=='Motel') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/motelflag.png'});
                }if (property.type=='Apartment') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/apartmentflag.png'});
                }if (property.type=='Transient') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/boardflag.png'});
                }if (property.type=='Boarding/Bed Spacer') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/bedflag.png'});
                }if (property.type=='Dormitory') {
                    flag = new LeafIcon({iconUrl: 'assets/leaflet/images/dormflag.png'});
                }
                let marker: any = leaflet.marker([property.lat, property.long], {icon: flag}).on('click', event => this.openPropertyDetail(event.target.data));
                marker.data = property;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);       
    }




}
