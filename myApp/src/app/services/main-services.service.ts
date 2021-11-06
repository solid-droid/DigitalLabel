import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainServicesService {

  private readonly Observable_QRvalue = new BehaviorSubject(undefined);
  getQRvalue = this.Observable_QRvalue.asObservable();

  constructor() { }

  setQRvalue(value:string) {
    this.Observable_QRvalue.next(value);
  }

}

