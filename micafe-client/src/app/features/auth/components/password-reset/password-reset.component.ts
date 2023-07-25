import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: [
    './password-reset.component.css',
    '../../styles/shared-styles.css'
  ]
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  resetForm: FormGroup;
  showSuccessMessage: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  hasError(controlName: string, error: string): boolean {
    return !!this.resetForm.get(controlName)?.hasError(error);
  }
  onSubmit() {
    this.resetForm.markAllAsTouched();
    if(this.resetForm.valid){
      this.sub.add(
        this.authService.resetPassword(this.resetForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.showSuccessMessage = true;
          },
          error: (err) => {
            console.log(err.error)
            this.toastr.error(err.error.error, 'Error');
          }
        })
      )
    }
  }
}
