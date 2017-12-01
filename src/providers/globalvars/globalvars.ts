import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GlobalvarsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GlobalvarsProvider {

public email:string = 'elton';
  
  constructor(public http: Http) {
    
  }
 	getMyValue() {
        return this.email;
    }

    setMyValue(value){
        this.email = value;
   }
}
