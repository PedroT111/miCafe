import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { navigationNavbar, loggedNavigationNavbar, profileNavigation } from '../../constants/navigation';
import { CartComponent } from 'src/app/features/shopping/components/cart/cart.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profileNavigation = profileNavigation;
  navigationNavbar = navigationNavbar;
  loggedNavigationNavbar = loggedNavigationNavbar;
  isLoggedIn: boolean = false;
  user: User | null;
  constructor(private authService: AuthService, private offCanvasService: NgbOffcanvas) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.user = this.authService.getUserData();
  }

  logOut(){
    this.authService.logOut();
    setTimeout(() => {
      this.isLoggedIn = this.authService.isLoggedIn();
    }, 2000);
  }

  openCart() {
    this.offCanvasService.open(CartComponent, { position: 'end' });
  }

}
