import { Component, OnDestroy, OnInit } from '@angular/core';
import { endOfDay, startOfMonth } from 'date-fns';
import { Subscription } from 'rxjs';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-customer-reports',
  templateUrl: './customer-reports.component.html',
  styleUrls: ['./customer-reports.component.css']
})
export class CustomerReportsComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  startDate: Date;
  endDate: Date;
  totalClients: string;
  newClients: string;
  avgOrderRating: string;
  activeClients: string;
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
    this.getStatistics();
  }

  getStatistics(){
    this.sub.add(
      this.reportService.getCustomerStatistics(this.startDate, this.endDate).subscribe({
        next: (res) => {
          const statistics = res.statistics;
          this.totalClients = statistics.totalClients.toString();
          this.newClients = statistics.newClients.toString();
          this.activeClients = statistics.activeClients.toString();
          this.avgOrderRating = statistics.averageOrderRating.toFixed(2).toString();
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  onDateSelection(dates: { startSale: Date; endSale: Date }){
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;

    this.getStatistics();
  }
}
