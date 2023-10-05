import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { ValidateAccountComponent } from './components/validate-account/validate-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    PasswordForgotComponent,
    ValidateAccountComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
