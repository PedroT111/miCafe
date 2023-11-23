import { Component, OnDestroy, OnInit } from '@angular/core';
import { endOfDay, startOfMonth } from 'date-fns';
import { ReportService } from '../services/report.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sale-reports',
  templateUrl: './sale-reports.component.html',
  styleUrls: ['./sale-reports.component.css']
})
export class SaleReportsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  startDate: Date;
  endDate: Date;
  totalSold:string;
  totalOrders:string;
  avgTotalAmount:string;
  totalItems:string;
  constructor(private reportService: ReportService) {
    const currentDate = new Date();
    const firstDayOfMonth = startOfMonth(currentDate);
    this.startDate = new Date(firstDayOfMonth);
    const today = endOfDay(currentDate);
    this.endDate = new Date(today);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.saleStatistics();
  }

  saleStatistics(){
    this.sub.add(
      this.reportService.getSalesStatistics(this.startDate, this.endDate).subscribe({
        next: (res) => {
          console.log(res, 'abcd')
          const statistics = res.statistics;
          
          this.totalSold = statistics.totalSold.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
          this.totalOrders = statistics.totalOrders.toString();
          this.avgTotalAmount = statistics.avgTotalAmount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
          this.totalItems = statistics.itemsSold.toString();

          console.log(this.totalSold, this.totalOrders,this.avgTotalAmount, this.totalItems)
        }
      })
    )
  }

  onDateSelection(dates: { startSale: Date; endSale: Date }) {
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;

    this.saleStatistics();
  }
}
