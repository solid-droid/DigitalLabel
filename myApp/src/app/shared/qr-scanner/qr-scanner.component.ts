import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss']
})
export class QrScannerComponent implements OnInit {

  scannerEnabled = false;
  torch = false;
  cameraReady = true;
  value = '';
  prevValue= 'abc';
  constructor(
    private readonly service : MainServicesService,
    private readonly router: Router,
  ) { }

  async ngOnDestroy() {
    this.disableScanner();
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.scannerEnabled = false;

    await new Promise(resolve => setTimeout(resolve, 500));
    this.scannerEnabled = true;
  }

  async disableScanner() {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.scannerEnabled = false;
    await new Promise(resolve => setTimeout(resolve, 500));
    this.router.navigate(['user']);
  }

  onTorchCompatible(e) {
    this.torch = true;
  }

  camerasFoundHandler(e) {
    this.cameraReady = true;
  }

  camerasNotFoundHandler(e) {
    this.cameraReady = false;
  }

  scanSuccessHandler(e) {
    this.value = e;
    const data = e.split('www.bayersDigital.com/')[1]
    if(data && this.prevValue !== data && data.includes('code')){
      this.prevValue = data;
      this.service.setQRvalue(data);
      this.disableScanner(); 
    }
  }

  scanErrorHandler(e) {
    // console.log(e);
  }

  scanCompleteHandler(e) {
 //object output
    // console.log(e);
  }

  scanFailureHandler(e) {
    // console.log(e);
  }

}
