import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { UserOrderList, UserSummary } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCustomers():Observable<UserSummary[]>{
    return this.http.get<UserOrderList>('/user/user').pipe(
      map((res) => {
        const customers = res.users.map((user) => {
          return {
            ...user,
            isValidated: user.isValidated ? 'Activo' : 'No Activo',
            registrationDate: new Date(user.registrationDate).toLocaleString(),
            lastOrderDate: user.lastOrderDate ? new Date(user.lastOrderDate).toLocaleString() : '-'
          }
        });
        return customers;
      })
    );
  }

  deleteUser(user: UserSummary):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`/user/${user._id}`);
  }
}
