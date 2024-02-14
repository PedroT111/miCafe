import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { HOME } from '../../constants/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {
  title = HOME.TITLE_BANNER;
  text = HOME.TEXT_BANNER;
  button = HOME.BUTTON_BANNER;
  constructor(private router: Router) { }

  ngOnInit(): void {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out'
    });
  }

  goSignUp(){
    this.router.navigate(['/auth/signup']);
  }

}
