import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SIGN_UP_FORM_FIELDS, SIGN_UP_PAGE } from '../../constants/index';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css','../../styles/shared-styles.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  readonly SIGN_UP_PAGE = SIGN_UP_PAGE;
  readonly formFields = SIGN_UP_FORM_FIELDS;
  sub: Subscription = new Subscription();
  showMessageSuccess: boolean;
  signUpForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.signUpForm = this.formBuilder.group({});
    this.setupFormFields();
  }

  ngOnInit(): void {
    this.showMessageSuccess= false;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  setupFormFields() {
    this.formFields.forEach((field) => {
      const validators = field.validators || [];
      const asyncValidators = field.asyncValidators || [];
      this.signUpForm.addControl(field.name, this.formBuilder.control('', validators, asyncValidators.map(validatorFn => validatorFn(this.authService))));
    });
  }
  onSignUp() {
    console.log('holala')
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      this.sub.add(
        this.authService.signUp(this.signUpForm.value).subscribe({
          next: () => {
            this.showMessageSuccess = true;
          },
          error: (err) => {
            this.toastr.error(err.error.message, 'Error');
            console.log(err)
          }
        })
      );
    }
  }
}
