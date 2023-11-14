/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { Order, OrderList, OrderResponse } from 'src/app/shared/models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<OrderList>('/orders').pipe(
      map((res) => {
        const orders = res.orders;
        if (orders.length === 0) {
          return [];
        }
        return orders.map((order) => {
          return {
            _id: order._id,
            orderNumber: order.orderNumber,
            products: order.products,
            combos: order.combos,
            customer: order.customer,
            pickUpDateTime: new Date(order.pickUpDateTime).toLocaleString(),
            isPickUpTimeConfirmed: order.isPickUpTimeConfirmed,
            actualPickUpDateTime: new Date(
              order.actualPickUpDateTime
            ).toLocaleString(),
            notes: order.notes,
            status: order.status,
            date: new Date(order.date).toLocaleString(),
            totalAmount: order.totalAmount,
            totalPoints: order.totalPoints,
            discountedAmount: order.discountedAmount,
            discountCode: order.discountCode,
            employee: order.employee,
            qualification: order.qualification
          };
        });
      })
    );
  }

  getOneOrder(id: string): Observable<Order> {
    return this.http.get<OrderResponse>(`/orders/${id}`).pipe(
      map((res) => {
        const order = res.order;
        return {
          _id: order._id,
          orderNumber: order.orderNumber,
          products: order.products,
          combos: order.combos,
          customer: order.customer,
          pickUpDateTime: new Date(order.pickUpDateTime).toLocaleString(),
          isPickUpTimeConfirmed: order.isPickUpTimeConfirmed,
          actualPickUpDateTime: new Date(
            order.actualPickUpDateTime
          ).toLocaleString(),
          notes: order.notes,
          status: order.status,
          date: new Date(order.date).toLocaleString(),
          totalAmount: order.totalAmount,
          totalPoints: order.totalPoints,
          discountedAmount: order.discountedAmount,
          discountCode: order.discountCode,
          employee: order.employee,
          qualification: order.qualification
        };
      })
    );
  }

  getOrdersByStatus(status: string): Observable<Order[]> {
    return this.http.get<OrderList>(`/orders/status/${status}`).pipe(
      map((res) => {
        const orders = res.orders;
        if (orders.length === 0) {
          return [];
        }
        return orders.map((order) => {
          return {
            _id: order._id,
            orderNumber: order.orderNumber,
            products: order.products,
            combos: order.combos,
            customer: order.customer,
            pickUpDateTime: new Date(order.pickUpDateTime).toLocaleString(),
            isPickUpTimeConfirmed: order.isPickUpTimeConfirmed,
            actualPickUpDateTime: new Date(
              order.actualPickUpDateTime
            ).toLocaleString(),
            notes: order.notes,
            status: order.status,
            date: new Date(order.date).toLocaleString(),
            totalAmount: order.totalAmount,
            totalPoints: order.totalPoints,
            discountedAmount: order.discountedAmount,
            discountCode: order.discountCode,
            employee: order.employee,
            qualification: order.qualification
          };
        });
      })
    );
  }

  changeOrderStatus(order: Order, status: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`/orders/${order._id}`,  {status: status} );
  }

  assingOrderToEmployee(order: Order): Observable<ApiResponse> {
    const employee = this.authService.getUserData()?._id;
    console.log(employee);
    return this.http.put<ApiResponse>(`/orders/assign/${order._id}`, {
      employee
    });
  }

  getOrdersByStatusAndEmployee(status: string): Observable<Order[]> {
    const employeeId = this.authService.getUserData()?._id;
    return this.http
      .get<OrderList>(`/orders/status/${status}/employee/${employeeId}`)
      .pipe(
        map((res) => {
          const orders = res.orders;
          if (orders.length === 0) {
            return [];
          }
          return orders.map((order) => {
            return {
              _id: order._id,
              orderNumber: order.orderNumber,
              products: order.products,
              combos: order.combos,
              customer: order.customer,
              pickUpDateTime: new Date(order.pickUpDateTime).toLocaleString(),
              isPickUpTimeConfirmed: order.isPickUpTimeConfirmed,
              actualPickUpDateTime: new Date(
                order.actualPickUpDateTime
              ).toLocaleString(),
              notes: order.notes,
              status: order.status,
              date: new Date(order.date).toLocaleString(),
              totalAmount: order.totalAmount,
              totalPoints: order.totalPoints,
              discountedAmount: order.discountedAmount,
              discountCode: order.discountCode,
              employee: order.employee,
              qualification: order.qualification
            };
          });
        })
      );
  }

  updateOrderEmployee(order: Order, employeeId: string):Observable<OrderResponse>{
    return this.http.put<OrderResponse>(`/orders/employee/${order._id}`, {employee: employeeId});
  }

  getOrdersByUser(user: User): Observable<Order[]> {
    return this.http.get<OrderList>(`/orders/user/${user._id}`).pipe(
      map((res) => {
        const orders = res.orders;
        if (orders.length === 0) {
          return [];
        }
        return orders.map((order) => {
          return {
            _id: order._id,
            orderNumber: order.orderNumber,
            products: order.products,
            combos: order.combos,
            customer: order.customer,
            pickUpDateTime: new Date(order.pickUpDateTime).toLocaleString(),
            isPickUpTimeConfirmed: order.isPickUpTimeConfirmed,
            actualPickUpDateTime: new Date(
              order.actualPickUpDateTime
            ).toLocaleString(),
            notes: order.notes,
            status: order.status,
            date: new Date(order.date).toLocaleString(),
            totalAmount: order.totalAmount,
            totalPoints: order.totalPoints,
            discountedAmount: order.discountedAmount,
            discountCode: order.discountCode,
            employee: order.employee,
            qualification: order.qualification
          };
        });
      })
    );
  }

  createOrder(order: Order):Observable<OrderResponse>{
    return this.http.post<OrderResponse>('/orders/new', order);
  }

  createOrderWithPoints(order: Order):Observable<OrderResponse>{
    return this.http.post<OrderResponse>('/orders/new/pay-with-points', order);
  }


  orderRate(orderId: string, rate: number):Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`/orders/qualification/${orderId}`, {qualification: rate});
  }

  changePickUpTime(orderId: string, pickUpDateTime: Date):Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`/orders/update-pick-up-date/${orderId}`, {pickUpDateTime});
  }
}
