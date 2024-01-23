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
  styleUrls: [
    './total-sell-period.component.css',
    '../../../styles/admin-style.css'
  ]
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
        grid: {
          color: 'rgba(241, 250, 238)'
        },
        ticks: {
          color: 'rgba(241, 250, 238)'
        }
      },
      y: {
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
      data: [],
      label: 'Total sales amount ARS',
      fill: false,
      borderWidth: 5,
      borderColor:'rgba(244, 162, 97,0.9)',
      hoverBorderColor: 'rgba(244, 162, 97,0.9)',
      hoverBackgroundColor: 'rgba(244, 162, 97)'
    }
  ];
  barChartColors: Color[] = ['rgba(244, 162, 97, 0.9)'];
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

  getSales() {
    this.sub.add(
      this.sub.add(
        this.reportService
          .getTotalSales(this.startDate, this.endDate, this.groupBy)
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
      )
    );
  }

  onGroupBySelect() {
    this.getSales();
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.getSales();
  }
}
