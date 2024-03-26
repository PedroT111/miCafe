import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-top-navbar-mobile',
  templateUrl: './top-navbar-mobile.component.html',
  styleUrls: ['./top-navbar-mobile.component.css']
})
export class TopNavbarMobileComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor( private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

}
