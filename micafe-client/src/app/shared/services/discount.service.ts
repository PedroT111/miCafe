/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import {
  Discount,
  DiscountForm,
  DiscountList,
  DiscountResponse,
  DiscountSummary
} from 'src/app/shared/models/discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private discountChanges = new BehaviorSubject<any>({});
  discountChanges$ = this.discountChanges.asObservable();

  constructor(private http: HttpClient) {}

  sendDiscount(discount: Discount) {
    this.discountChanges.next(discount);
  }

  getAllDiscounts(): Observable<DiscountSummary[]> {
    return this.http.get<DiscountList>('/discount').pipe(
      map((res) => {
        const discounts = res.discounts.map((d) => {
          return {
            ...d,
            value:
              d.discountType === 'fixedAmount' ? `$ ${d.value}` : `${d.value}%`,
            expirationDate: new Date(d.expirationDate).toLocaleDateString()
          };
        });
        return discounts;
      })
    );
  }

  private createDiscount(
    discount: DiscountForm,
    endpoint: string,
    queryParams: { [key: string]: string | number | null } = {}
  ): Observable<ApiResponse> {
    const discountData: Discount = {
      code: discount.code,
      description: discount.description,
      discountType: discount.discountType,
      value: discount.value,
      expirationDate: discount.expirationDate
    };
  
    const filteredQueryParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(queryParams).filter(([_, value]) => value !== null)
    );
  
    const queryParamsString = Object.entries(filteredQueryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!.toString())}`)
      .join('&');
  
    const apiUrl = `/discount/new/${endpoint}/?${queryParamsString}`;
  
    return this.http.post<ApiResponse>(apiUrl, discountData);
  }
  
  createDiscountForTopClientes(discount: DiscountForm): Observable<ApiResponse> {
    const queryParams = {
      filter: discount.filters.periodTime,
      limit: discount.filters.limit
    };
  
    return this.createDiscount(discount, 'top-users', queryParams);
  }
  
  createDiscountForInactiveClients(discount: DiscountForm): Observable<ApiResponse> {
    const queryParams = {
      inactiveDays: discount.filters.numberDaysLastOrder
    };
  
    return this.createDiscount(discount, 'inactive-users', queryParams);
  }

  deleteDiscount(code: string):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`/discount/${code}`);
  }
  

  validateDiscount(code: string, customerId: string): Observable<DiscountResponse> {
    const url = `/discount/validate?code=${code}&user=${customerId}`;
    return this.http.get<DiscountResponse>(url);
  }
  
  
}
