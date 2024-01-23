/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { Sales } from 'src/app/shared/models/report';

@Component({
  selector: 'app-sale-by-weekday',
  templateUrl: './sale-by-weekday.component.html',
  styleUrls: [
    './sale-by-weekday.component.css',
    '../../../styles/admin-style.css'
  ]
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
        grid: {
          color: 'rgba(241, 250, 238)'
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
          stepSize: 1
        }
      },
      y: {
        min: 0,
        grid: {
          color: 'rgba(241, 250, 238)'
        },
        ticks: {
          color: 'rgba(241, 250, 238)'
        }
      }
    },
    plugins: {
      legend: { display: true, labels: {
        color: 'rgba(241, 250, 238)'
      } }
    }
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      label: 'Total sales amount (ARS)',
      data: [],
      hoverBackgroundColor: 'rgba(42, 157, 143)'
    }
  ];
  barChartColors: Color[] = ['rgba(42, 157, 143, 0.7)'];
  constructor(private reportService: ReportService) {}
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

  getInfo() {
    this.sub.add(
      this.reportService
        .getTotalSalesByDayOfWeek(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            this.sales = res.sales;
            this.barChartLabels = this.sales.map((sale) => sale._id);
            this.barChartData[0].data = this.sales.map(
              (sale) => sale.totalAmount
            );
            this.barChartData[0].backgroundColor = this.barChartColors;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }
}
