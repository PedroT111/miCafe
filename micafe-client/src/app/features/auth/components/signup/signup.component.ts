import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../styles/shared-styles.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  showMessageSuccess: boolean = true;
  signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  hasError(controlName: string, error: string): boolean {
    return !!this.signUpForm.get(controlName)?.hasError(error);
  }
  onSignUp() {
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
