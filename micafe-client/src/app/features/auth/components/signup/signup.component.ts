import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { EmailValidator } from '../../validators/check-email';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/shared-styles.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  showMessageSuccess: boolean;
  signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email], [EmailValidator.checkEmail(this.authService)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.showMessageSuccess= false;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSignUp() {
    console.log(this.signUpForm.get('email')?.errors, 'erroreees')
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.sub.add(
        this.authService.signUp(this.signUpForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.showMessageSuccess = true;
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
          }
        })
      );
    }
  }
}
