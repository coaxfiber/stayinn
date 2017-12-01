import {Component} from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';

import { NavController, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import leaflet from 'leaflet'; 
import L from 'leaflet'; 

import { GlobalvarsProvider } from '../../providers/globalvars/globalvars';

import { AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
declare var cordova: any;

/**
 * Generated class for the AddstayinnPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addstayinn',
   templateUrl: 'addstayinn.html'
})
export class AddstayinnPage {
  form: FormGroup;
  map2;
  lastImage: string = null;
  loading: Loading;
  long:string = '';
  lat:string = '';
  username:string = '';
  buttonDisabled = true;
userData: any;
  constructor(private alertCtrl: AlertController,private facebook: Facebook,fb: FormBuilder,public navCtrl: NavController,public globalvars: GlobalvarsProvider, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.form = fb.group({
      name: fb.group({
        title: '',
        address: '',
        contact: '',
        price: '',
         type: '',
      }),
    });
    this.username = this.globalvars.getMyValue();
    this.showMap();
  this.fblogin();

        this.presentConfirm();
  }
fblogin(){
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
              this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
                this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
              });
            });

  }
presentConfirm() {
          let alert = this.alertCtrl.create({
            title: 'Fb Login',
            message: 'Stay inn Locator requires you to login to your fb account to add an stay inn location.',
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
       }

testform()
{
  if (this.form.value.name.title==''||this.form.value.name.address==''||this.form.value.name.contact==''||this.form.value.name.price==''||this.form.value.name.type==''||this.lastImage==null||this.long==''||this.lat=='') {
    alert("Fill all the Fields on the form.");
  }else
  {
    this.uploadImage();
  }

}
  showMap(){
     setTimeout(() => {
            this.map2 = leaflet.map("map2").setView([17.610569, 121.730092], 12);
            leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; techventures.ph'
            }).addTo(this.map2);

            var popup = L.popup();
           this.map2.on('click', e => {
              popup
              .setLatLng(e.latlng)
              .setContent("<b>Selected Location</b><br>Coordinates: <br>lat: " + e.latlng.lat.toString() +"<br>lng: "+ e.latlng.lng.toString())
              .openOn(this.map2); 
                this.long =  e.latlng.lng;
                this.lat =  e.latlng.lat;
                this.buttonDisabled = false;
                //console.log(this.form.value.name.title);
           });

        })
  }

 public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
  var url = "http://pmt.i-tugue.com/stayinn-backend/upload.php?title="+this.form.value.name.title+"&address="+this.form.value.name.address+"&contact="+this.form.value.name.contact+"&price="+this.form.value.name.price+"&type="+this.form.value.name.type+"&long="+this.long+"&lat="+this.lat+"&email="+this.userData.email+"&name="+this.userData.username;
   this.form.value.name.title = null;
   this.form.value.name.address = null;
   this.form.value.name.contact = null;
   this.form.value.name.price = null;
   this.form.value.name.type = null;
   this.long = null;
   this.lat = null;
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename}
  };
 
  const fileTransfer: TransferObject = this.transfer.create();
 
  this.loading = this.loadingCtrl.create({
    content: 'Adding your Stay Inn...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll()
    this.presentToast('location succesfully Added. Wait for the Admin to approve the Stay inn. Maximum of 24 hours.');
    this.form.reset();
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });
  this.lastImage=null;
}







}
