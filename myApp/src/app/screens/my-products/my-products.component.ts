import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainServicesService } from 'src/app/services/main-services.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit, OnDestroy {
  mobile = false;

  showSuccess = false;
  showFail = false;
  oldCode = false;

  productList = [];
  prevCode = '';
  showMore = false;
  subscription1:any;
  selectedProduct={};
  
  constructor(
    private readonly service: MainServicesService,
  ) { }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
  }
  ngOnInit(){

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
        description:'Made with special growth incredients, tested and certified ISO 445',
        expiry:'11/12/2020',
        quantity: 7,
      },
    ];
    
   this.subscription1 = this.service.getQRvalue.subscribe(res => {
        if(res && res!=='N/A'){
          const exist = this.productList.find(x => x.code === res.split('_')[1]);
          if(exist){
            // exist.quantity++;
          } else {
            fetch(this.service.backend+'/customer',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                scannedBy:'customer_Code',
                geoLoc:{lat:this.service.lat,long:this.service.long},
                code: res
                })
            }).then(result => result.json()).then(async result => {
              if(!result.invalid){
                if(!result.complete){

                    this.showSuccess = true;
                    setTimeout(() => {
                      this.showSuccess = false;
                    },2000);

                    this.productList.push({
                      code: res.split('_')[1],
                      name:'c2 Fert prod', 
                      verified:true, 
                      image:'assets/product2.png',
                      description:'Made with natural material, tested and certified ISO 143',
                      expiry:'12/12/2020',
                      quantity: 1,
                    });

                   } else {

                      this.oldCode = true;
                      setTimeout(() => {
                        this.oldCode = false;
                      },2000);

                   }

                    
       
                 } else {
                    this.showFail = true;
                    setTimeout(() => {
                      this.showFail = false;
                    },2000);
                 }
            });
          }
         
        } else {
          if(res === 'N/A'){
            this.showFail = true;
            setTimeout(() => {
              this.showFail = false;
            },2000);
          }
        }

    });



    if (window.screen.width === 360) { // 768px portrait
      this.mobile = true;
    }

  }

}
