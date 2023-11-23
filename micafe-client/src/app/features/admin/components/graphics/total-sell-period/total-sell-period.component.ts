/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sales } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-total-sell-period',
  templateUrl: './total-sell-period.component.html',
  styleUrls: ['./total-sell-period.component.css']
})
export class TotalSellPeriodComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  sales: Sales[] = [];
  groupBy: string;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 1
      }
    },
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
    plugins: {
      legend: { display: true }
    }
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Total sales amount ARS',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  barChartColors: Color[] = ['rgba(54, 162, 235, 0.7)'];
  constructor(private reportService: ReportService) {
    this.groupBy = 'day';
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      console.log(this.startDate, this.endDate);
      this.getSales();
    }
  }

  ngOnInit(): void {
    this.getSales();
  }

  getSales(){
    this.sub.add(
      this.sub.add(
        this.reportService.getTotalSales(this.startDate, this.endDate, this.groupBy).subscribe({
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
    )
  }

  

  onGroupBySelect() {
    this.getSales();
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.getSales();
  }
}
