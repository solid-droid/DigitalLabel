import { Component, OnInit } from '@angular/core';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-employee-ui',
  templateUrl: './employee-ui.component.html',
  styleUrls: ['./employee-ui.component.scss']
})
export class EmployeeUIComponent implements OnInit {

  subscription1: any;
  codeList = [];

  constructor(
    private readonly service: MainServicesService
  ) { }

  ngOnInit(): void {
    this.subscription1 = this.service.getQRvalue.subscribe(res => {
      if(res && res!=='N/A'){
        if(!this.codeList.find(x => x.code === res)){
          this.codeList.unshift({code: res});
          fetch('http://localhost:3900/add',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              scannedBy:'BayerEmployee_Code',
              scannedAt:'ProductionCenter_code',
              geoLoc:{lat:this.service.lat,long:this.service.long},
              code: res
              })
          });
        }
      }
    });
    
  }

}
