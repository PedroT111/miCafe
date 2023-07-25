import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles/shared-styles.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  sub: Subscription = new Subscription();
  loginForm: FormGroup;
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  hasError(controlName: string, error: string): boolean {
    return !!this.loginForm.get(controlName)?.hasError(error);
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.sub.add(
        this.authService.login(this.loginForm.value).subscribe({
          next: (res) => {
            this.authService.saveToken(res.token);
            this.authService.saveUserData(res.user);
            //redirigir al inicio
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.log(err);
            this.toastr.error(err.error.message, 'Error');
          }
        })
      );
    }
  }
}
