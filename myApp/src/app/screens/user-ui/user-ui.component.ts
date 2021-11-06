import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const Swiper;
declare const $;
@Component({
  selector: 'app-user-ui',
  templateUrl: './user-ui.component.html',
  styleUrls: ['./user-ui.component.scss']
})
export class UserUIComponent implements OnInit, OnDestroy {
  swiper:any;
  currentSlide = 1;
  constructor(
    private readonly router: Router,
  ) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    const tabList = ['Help', 'Products', 'Store']
    const tabs = document.getElementsByClassName('Tab');

    this.swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			paginationClickable: true,
			loop: false,
      initialSlide: 1,
      paginationBulletRender: () => ''
    }).on('slideChange',  e =>  {
      // this.currentSlide = e.activeIndex;
      Array.prototype.forEach.call(tabs, tab =>	tab.classList.remove('active'));
      document.querySelector('._'+tabList[e.activeIndex]).classList.add('active');
    });

    Array.prototype.forEach.call(tabs, tab => tab.addEventListener('click', e =>{
          this.swiper.slideTo(tabList.findIndex(x => x == e.target.innerText));
          Array.prototype.forEach.call(tabs, tab =>	tab.classList.remove('active'));
          e.currentTarget.classList.add('active');
    }));
    

  }
  scanQRcode() {
    this.router.navigate(['scanner']);
  }

}
