import { Component, OnInit } from '@angular/core';
declare const $;
@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss']
})
export class QrGeneratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.generateQrCode();
  }

  generateQrCode() {
    $('#qrcodeCanvas').qrcode({
      text	: "nikhil"
    });	
  }

}
