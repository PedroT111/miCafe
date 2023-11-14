/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sales } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';
import { MONTH_LIST } from '../../../constants/report';

@Component({
  selector: 'app-total-sell-period',
  templateUrl: './total-sell-period.component.html',
  styleUrls: ['./total-sell-period.component.css']
})
export class TotalSellPeriodComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  year: number;
  view: string = 'monthly';
  month: string | null;
  sales: Sales[] = [];
  monthList = MONTH_LIST;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo',
          color: 'black',
          font: {
            size: 14
          }
        },
        ticks: {
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'ARS ($)',
          color: 'black',
          font: {
            size: 14
          }
        },
        min: 0
      }
    },
    plugins: {
      legend: { display: true },
    },
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Monto Total Vendido ARS',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  barChartColors: Color[] = ['rgba(54, 162, 235, 0.7)'];
  constructor(private reportService: ReportService) {
    this.year = new Date().getFullYear();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getSales();
  }

  onYearSelection(year: number){
    this.year = year;
    this.getSales();
  }

  getSales() {
    this.sub.add(
      this.reportService
        .getMonthlySaleByYearOrByMonth(this.view, this.year, this.month)
        .subscribe({
          next: (res) => {
            this.sales = res.sales;
            console.log(res)
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
    );
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
    this.getSales();
  }

  changeView(){
    console.log(this.view)
    if(this.view === 'daily'){
      this.month = (new Date().getMonth() + 1 ).toString();
    }
  }

}
