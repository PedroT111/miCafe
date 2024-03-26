import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { COMPANY } from 'src/app/shared/constants';
import { ADMIN_NAVIGATION } from 'src/app/shared/constants/navigation';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  readonly companyName = COMPANY.COMPANY_NAME;
  readonly reportNavs = ADMIN_NAVIGATION.REPORT_NAVS;
  readonly productNavs = ADMIN_NAVIGATION.PRODUCT_NAVS;
  readonly mainNavs = ADMIN_NAVIGATION.MAIN_NAVS;

  isCollapsed = true;
  isCollapsedReports = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
