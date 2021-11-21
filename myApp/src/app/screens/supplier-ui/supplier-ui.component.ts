import { Component, OnInit } from '@angular/core';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-supplier-ui',
  templateUrl: './supplier-ui.component.html',
  styleUrls: ['./supplier-ui.component.scss']
})
export class SupplierUIComponent implements OnInit {
  subscription1: any;
  codeList = [];

  constructor(
    private readonly service: MainServicesService
  ) { }

  ngOnInit(): void {
    this.subscription1 = this.service.getQRvalue.subscribe(res => {
      if(res && res!=='N/A'){
        if(!this.codeList.find(x => x.code === res)){
          fetch(this.service.backend+'/update',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              scannedBy:'SupplierEmployee_Code',
              scannedAt:'SupplierCenter_code',
              geoLoc:{lat:this.service.lat,long:this.service.long},
              code: res
              })
          }).then(x => x.json()).then(result => {
            if(result.invalid){
              this.codeList.unshift({code: res, invalid: true});
            } else {
              this.codeList.unshift({code: res, invalid: false});
            }
          });
        }
      }
    });
  }

}
