import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { PasswordForgotComponent } from './components/password-forgot/password-forgot.component';
import { PAGES } from 'src/app/shared/constants';
import { ValidateAccountComponent } from './components/validate-account/validate-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: PAGES.AUTH_LOGIN, pathMatch: 'full' },
      { path: PAGES.AUTH_LOGIN, component: LoginComponent },
      { path: PAGES.AUTH_SIGNUP, component: SignupComponent },
      { path: PAGES.AUTH_FORGOT_PASSWORD, component: PasswordForgotComponent },
      {path: 'validate-account/:token', component: ValidateAccountComponent},
      {path: 'reset-password', component: ResetPasswordComponent}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
