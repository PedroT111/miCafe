/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ListSales,
  ListMostSoldProducts,
  ListCalifications,
  ListDistributionAvgCalifications,
  ListCategorySales,
  ListNewCustomersByMonth,
  SaleStatistics,
  CustomerStatistics,
  TopBuyingCustomers
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

  getTotalSalesByDayOfWeek(
    startDate: Date,
    endDate: Date
  ): Observable<ListSales> {
    return this.http.get<ListSales>(
      `/report/sales-by-day-of-week?startDate=${startDate}&endDate=${endDate}`
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

  getRatingDistributionByEmployee(
    employeeId: string
  ): Observable<ListDistributionAvgCalifications> {
    return this.http.get<ListDistributionAvgCalifications>(
      `/report/qualification-distribution-by-employee/${employeeId}`
    );
  }

  getMonthAvgCalificationsEmployeeByYear(year: string): Observable<any> {
    return this.http.get<any>(`/report/qualification-avg-employee/${year}`);
  }

  getSalesByHourOfDay(startDate: Date, endDate: Date): Observable<ListSales> {
    return this.http.get<ListSales>(
      `/report/sales-by-hour-of-day?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getCategorySales(
    startDate: Date,
    endDate: Date
  ): Observable<ListCategorySales> {
    return this.http.get<ListCategorySales>(
      `/report/total-selled-by-category?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getNewCustomersByPeriod(
    startDate: Date,
    endDate: Date,
    groupBy: string
  ): Observable<ListNewCustomersByMonth> {
    return this.http.get<ListNewCustomersByMonth>(
      `/report/new-users-by-period/?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`
    );
  }

  getTotalSales(
    startDate: Date,
    endDate: Date,
    groupBy: string
  ): Observable<ListSales> {
    return this.http.get<ListSales>(
      `/report/total-sales?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`
    );
  }

  getSalesStatistics(
    startDate: Date,
    endDate: Date
  ): Observable<SaleStatistics> {
    return this.http.get<SaleStatistics>(
      `/report/sales-statistics?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getCustomerStatistics(
    startDate: Date,
    endDate: Date
  ): Observable<CustomerStatistics> {
    return this.http.get<CustomerStatistics>(
      `/report/customers-statistics?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getTopBuyingCustomers(
    startDate: Date,
    endDate: Date
  ): Observable<TopBuyingCustomers> {
    return this.http.get<TopBuyingCustomers>(
      `/report/top-buying-customers?startDate=${startDate}&endDate=${endDate}`
    );
  }

  getProductVariation(
    year:string,
    productId: string
  ): Observable<any> {
    return this.http.get<any>(
      `/report/change-price-product?year=${year}&productId=${productId}`
    );
  }
}
