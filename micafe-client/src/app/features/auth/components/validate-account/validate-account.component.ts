import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit, OnDestroy {
  token: string = '';
  sub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.token = this.actRoute.snapshot.params['token'];
    this.validarCuenta();
  }

  validarCuenta() {
    if (this.token !== null) {
      this.sub.add(
        this.authService.validateAccount(this.token).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        })
      );
    }
  }
}
