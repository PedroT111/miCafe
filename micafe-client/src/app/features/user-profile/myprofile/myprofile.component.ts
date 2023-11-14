import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  sub: Subscription = new Subscription();
  user: User | null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub.add(
      this.authService.getUserDateAndUpdateLocalStorage().subscribe({
        next: (res) => {
          this.user = res.user;
        }
      })
    );
  }

  logOut() {
    this.authService.logOut();
  }
}
