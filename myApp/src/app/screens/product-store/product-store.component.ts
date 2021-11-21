import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-store',
  templateUrl: './product-store.component.html',
  styleUrls: ['./product-store.component.scss']
})
export class ProductStoreComponent implements OnInit {

  productList = [];
  constructor() { }

  ngOnInit(): void {
    this.productList = [
      {
        code:'1234',
        name:'Organic Fert prod', 
        verified:true, 
        image:'assets/product2.png',
        description:'Made with natural material, tested and certified ISO 143',
        expiry:'12/12/2020',
        quantity: 10,
      },
      {
        code:'999',
        name:'B2 fert prod', 
        verified:true, 
        image:'assets/product1.png',
        description:'Made with natural material, tested and certified ISO 143',
        expiry:'11/12/2020',
        quantity: 7,
      },
      {
        code:'999',
        name:'B2 fert prod', 
        verified:true, 
        image:'assets/product1.png',
        description:'Made with natural material, tested and certified ISO 143',
        expiry:'11/12/2020',
        quantity: 7,
      },
      {
        code:'999',
        name:'B2 fert prod', 
        verified:true, 
        image:'assets/product1.png',
        description:'Made with natural material, tested and certified ISO 143',
        expiry:'11/12/2020',
        quantity: 7,
      },
    ];
  }

}
