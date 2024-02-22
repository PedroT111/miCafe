import { Component, OnInit } from '@angular/core';
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
  }

  goSignUp(){
    this.router.navigate(['/auth/signup']);
  }

}
