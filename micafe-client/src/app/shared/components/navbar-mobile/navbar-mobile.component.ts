/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, } from '@angular/core';
import { mobileNavigation } from '../../constants/navigation';
import { User } from '../../models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartComponent } from 'src/app/features/shopping/components/cart/cart.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit {
  navigationMobile = mobileNavigation;
  isLoggedIn: boolean = false;
  user: User | null;
  constructor(
    private authService: AuthService,
    private offCanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUserData();
  }

  logOut() {
    this.authService.logOut();
    setTimeout(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, 2000);
  }

  openCart() {
    this.offCanvasService.open(CartComponent, { position: 'end' });
  }
}
