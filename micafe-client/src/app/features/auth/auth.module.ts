import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent,
    PasswordResetComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
