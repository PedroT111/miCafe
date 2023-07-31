import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthComponent } from './auth/auth.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PAGES } from 'src/app/shared/constants';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: PAGES.AUTH_LOGIN, pathMatch: 'full' },
      { path: PAGES.AUTH_LOGIN, component: LoginComponent },
      { path: PAGES.AUTH_SIGNUP, component: SignupComponent },
      { path: PAGES.AUTH_RESET_PASSWORD, component: PasswordResetComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
