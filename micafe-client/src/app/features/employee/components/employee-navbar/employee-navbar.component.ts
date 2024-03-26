import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.css']
})
export class EmployeeNavbarComponent implements OnInit {
  user: User | null;
  constructor(private authUser: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authUser.getUserData();
  }

  logOut(){
    this.authUser.logOut();
    this.router.navigate(['/']);
  }

}
