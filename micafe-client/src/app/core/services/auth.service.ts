/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoginRes,
  RegistrationRes,
  User,
  UserApi,
  UserAuth
} from 'src/app/shared/models/user';
import { Observable} from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  getUserDateAndUpdateLocalStorage():Observable<UserApi>{
    const id = this.getUserData()?._id;
    return this.httpClient.get<UserApi>(`/authenticate/me/${id}`);
  }

  login(user: UserAuth): Observable<LoginRes> {
    return this.httpClient.post<LoginRes>('/authenticate/login', user);
  }

  signUp(user: User): Observable<RegistrationRes> {
    return this.httpClient.post<RegistrationRes>('/authenticate/signup', user);
  }
  resetPassword(email: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
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

  isEmailRegistered(email: string):Observable<any>{
    return this.httpClient.post<any>('/authenticate/check-email',{ email});
  }

  validateAccount(token: string):Observable<ApiResponse>{
    console.log(token)
    return this.httpClient.get<ApiResponse>(`/authenticate/validate/${token}`);
  }
}
