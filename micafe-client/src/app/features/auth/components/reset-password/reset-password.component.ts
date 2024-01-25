import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  form: FormGroup;
  constructor(
    private actRouted: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = this.actRouted.snapshot.params['token'];
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      const password = this.form.controls['password'].value;
      this.authService.changePassword(password, this.token).subscribe({
        next: (res) => {
          this.toastr.success(res.msg);
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
