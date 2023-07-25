import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRes,
  RegistrationRes,
  User,
  UserAuth
} from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { PostResponse } from 'src/app/shared/models/postResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(user: UserAuth): Observable<LoginRes> {
    return this.httpClient.post<LoginRes>('/authenticate/login', user);
  }

  signUp(user: User): Observable<RegistrationRes> {
    return this.httpClient.post<RegistrationRes>('/authenticate/signup', user);
  }
  resetPassword(email: string): Observable<PostResponse> {
    return this.httpClient.post<PostResponse>(
      '/authenticate/forgot-password',
      email
    );
  }
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  saveUserData(user: User): void {
    const data = JSON.stringify(user);
    localStorage.setItem('user', data);
  }

  getUserData(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.clear();
  }
}
