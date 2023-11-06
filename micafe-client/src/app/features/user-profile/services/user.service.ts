import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserApi } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateUserInformation(user: User):Observable<UserApi>{
    return this.http.put<UserApi>(`/user/${user._id}`, user);
  }
}
