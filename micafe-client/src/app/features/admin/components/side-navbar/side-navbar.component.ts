import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { COMPANY } from 'src/app/shared/constants';
import { adminNavigationNavbar } from 'src/app/shared/constants/navigation';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  readonly companyName = COMPANY.COMPANY_NAME;
  readonly navigation = adminNavigationNavbar;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
