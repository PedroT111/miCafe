/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  user: User | null;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  updateProfile(userUpdated: any) {
    console.log(userUpdated);
    this.sub.add(
      this.userService.updateUserInformation(userUpdated).subscribe({
        next: (res) => {
          console.log(res);
          if (res.ok) {
            this.authService.saveUserData(res.user);
            setTimeout(() => {
              this.router.navigate(['/profile']);
            }, 3000);
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
