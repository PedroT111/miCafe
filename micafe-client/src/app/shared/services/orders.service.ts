import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { Order, OrderList } from 'src/app/shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOrdersByStatus(status: string):Observable<OrderList>{
    return this.http.get<OrderList>(`/orders/${status}`);    
  }

  changeOrderStatus(order: Order, status: string):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`/orders/${order._id}`, {status});
  }

  getOrdersByStatusAndEmployee(status: string): Observable<OrderList>{
    const employeeId = this.authService.getUserData()?.id;
    return this.http.get<OrderList>(`/orders/${employeeId}/${status}`);  
  }
}
