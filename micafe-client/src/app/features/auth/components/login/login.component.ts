import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder,} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LOGIN_FORM_FIELDS,LOGIN_PAGE} from '../../constants/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../styles/shared-styles.css']
})
export class LoginComponent implements OnDestroy, OnInit {
  readonly LOGIN_FORM_FIELDS = LOGIN_FORM_FIELDS;
  readonly LOGIN_PAGE = LOGIN_PAGE;
  sub: Subscription = new Subscription();
  loginForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({});
    this.setupFormFields();
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  setupFormFields() {
    this.LOGIN_FORM_FIELDS.forEach((field) => {
      const validators = field.validators || [];
      this.loginForm.addControl(field.name, this.formBuilder.control('', validators));
    });
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
