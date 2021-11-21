import { Component, OnInit } from '@angular/core';
declare const H;

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  platform: any;
  defaultLayers: any;
  map: any;
  behavior: any;
  ui: any;
  data: any;
  markerData = {};
  

  constructor() { }

  ngOnInit(): void {
    this.platform = new H.service.Platform({
      apikey: 'JP1jNJMt6pMack2_WYjaOAyAp0ksxo9EJw_bqgmURqs'
    });
    this.defaultLayers = this.platform.createDefaultLayers();
    
    this.map = new H.Map(document.getElementById('map'),
      this.defaultLayers.vector.normal.map,{
      center: {lat:10, lng:5},
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });
  
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    
  
    this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);

    this.map.setCenter({lat:15, lng:30});
    this.map.setZoom(2.5);

    this.getData();
  }

  async getData(){
    this.data = (await (await fetch('http://localhost:3900/getAllProduct')).json()).data;
    this.data.forEach(item => {
      const bayer = {...item.geoLoc, type:0 , time:item.timeStamp, valid:!item.invalidSuplierScan};
      const supplierList = item.supplierScans.map(dat => {
        return {...dat.geoLoc, type:1,time:item.timeStamp, valid:!dat.invalid};
      });
      const customer = {...item.customerGeoLoc, type:2, time:item.customerScanTimeStamp, valid:item.customerScan};
      
      if(item.customerScan){
        this.markerData[item.code] = {data: [bayer,...supplierList,customer]};
      } else if (item.supplierScan) {
        this.markerData[item.code] = {data: [bayer,...supplierList]};
      }
      
      Object.keys(this.markerData).forEach(key => {
        this.markerData[key].data.forEach((marker,i) => {
          try{
            const lat = typeof marker.lat === 'string' ? parseFloat(marker.lat) : marker.lat;
            const long = typeof marker.long === 'string' ? parseFloat(marker.long) : marker.long;
            this.markerData[key].data[i].lat = lat;
            this.markerData[key].data[i].long = long;
            this.addMarker(this.markerData[key].data[i]);
          } catch(e){
            console.log(e);
            this.markerData[key].splice(i,1);
          }
          
        });
        this.addLine(this.markerData[key].data);
      });
     
      console.log(this.markerData);
    });
  };

  addMarker(marker){
    if(marker.type === 0){
      const icon = new H.map.Icon('../../../assets/logo.svg',{size: {w: 50, h: 50}});
      const bayer = new H.map.Marker({lat:marker.lat, lng:marker.long},{icon:icon});
      this.map.addObject(bayer);
    } else if (marker.type === 1) {
      const icon = new H.map.Icon('../../../assets/supplier.png',{size: {w: 50, h: 50}});
      const supplier = new H.map.Marker({lat:marker.lat, lng:marker.long},{icon:icon});
      this.map.addObject(supplier);
    }
    else if (marker.type === 2) {
      const icon = new H.map.Icon('../../../assets/customer.png',{size: {w: 50, h: 50}});
      const customer = new H.map.Marker({lat:marker.lat, lng:marker.long},{icon:icon});
      this.map.addObject(customer);
    }
  }

  addLine(markerList){
    let lineString = new H.geo.LineString();
    markerList.forEach(marker => {
      lineString.pushPoint({lat:marker.lat, lng:marker.long});
    });
    const line =new H.map.Polyline(lineString, 
      { 
          style: {
              
          lineWidth: 1,
          strokeColor: 'rgba(0, 0, 0, 1)',
          arrows : true,
          lineHeadCap: 'arrow-head'
  
          }
      }
  )
    this.map.addObject(line);
  }
  

}
