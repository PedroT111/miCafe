/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ListSales,
  ListMostSoldProducts,
  ListCalifications
} from 'src/app/shared/models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getMostSoldProducts(
    startDate: Date,
    endDate: Date
  ): Observable<ListMostSoldProducts> {
    return this.http.get<ListMostSoldProducts>(
      `/report/most-selled-products?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getMonthlySaleByYearOrByMonth(
    view: string,
    year: number,
    month: string | null
  ): Observable<ListSales> {
    let url: string = `/report/sales?view=${view}&year=${year}&month=${month}`;
    if (month === null || month === undefined) {
      url = `/report/sales?view=${view}&year=${year}`;
    }
    return this.http.get<ListSales>(url);
  }

  getTotalSalesByDayOfWeek(year: string, month: string): Observable<ListSales> {
    return this.http.get<ListSales>(
      `/report/sales-by-day-of-week?year=${year}&month=${month}`
    );
  }

  getRatingDistribution(
    startDate: Date,
    endDate: Date
  ): Observable<ListCalifications> {
    return this.http.get<ListCalifications>(
      `/report/qualification-distribution?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getSalesByHourOfDay(startDate: Date, endDate: Date): Observable<ListSales> {
    return this.http.get<ListSales>(
      `/report/sales-by-hour-of-day?startDate=${startDate}&endDate=${endDate}`
    )
  }
}
