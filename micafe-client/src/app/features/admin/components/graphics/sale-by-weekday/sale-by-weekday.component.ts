/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { Sales } from 'src/app/shared/models/report';

@Component({
  selector: 'app-sale-by-weekday',
  templateUrl: './sale-by-weekday.component.html',
  styleUrls: ['./sale-by-weekday.component.css']
})
export class SaleByWeekdayComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  sales: Sales[];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          stepSize: 1
        }
      },
      y: {
        min: 0
      }
    },
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      label: 'Total sales amount (ARS)',
      data: [],
      hoverBackgroundColor: 'rgba(75, 192, 192)'
    }
  ];
  barChartColors: Color[] = [
    'rgba(75, 192, 192, 0.7)',
  ];
  constructor(private reportService: ReportService) {
  
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      console.log(this.startDate, this.endDate);
      this.getInfo();
    }
  }

  getInfo(){
    this.sub.add(
      this.reportService.getTotalSalesByDayOfWeek(this.startDate, this.endDate).subscribe({
        next: (res) => {
          this.sales = res.sales;
          this.barChartLabels = this.sales.map(
            (sale) => sale._id
          );
          this.barChartData[0].data = this.sales.map(
            (sale) => sale.totalAmount
          );
          this.barChartData[0].backgroundColor = this.barChartColors;
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }
}
