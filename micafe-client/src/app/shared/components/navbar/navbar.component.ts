import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { navigationNavbar, loggedNavigationNavbar } from '../../constants/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  navigationNavbar = navigationNavbar;
  loggedNavigationNavbar = loggedNavigationNavbar;
  isLoggedIn: boolean = false;
  user: User | null;
  constructor(private authService: AuthService) { }

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

}
