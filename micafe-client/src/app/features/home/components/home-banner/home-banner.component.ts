import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out'
    });
  }

}
