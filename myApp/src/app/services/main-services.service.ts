import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainServicesService {

  lat;
  long;
  backend = 'https://peaceful-bartik-27a470.netlify.app/.netlify/functions/server';
  private readonly Observable_QRvalue = new BehaviorSubject(undefined);
  getQRvalue = this.Observable_QRvalue.asObservable();

  constructor() {
    this.getLocation();
   }

  setQRvalue(value:string) {
    this.Observable_QRvalue.next(value);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lat = pos.coords.latitude;
        this.long = pos.coords.longitude; 
      });
    }
  }

}

