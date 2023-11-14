/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { Sales } from 'src/app/shared/models/report';
import { MONTH_LIST } from '../../../constants/report';

@Component({
  selector: 'app-sale-by-weekday',
  templateUrl: './sale-by-weekday.component.html',
  styleUrls: ['./sale-by-weekday.component.css']
})
export class SaleByWeekdayComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  year: string;
  month: string;
  sales: Sales[];
  monthList = MONTH_LIST;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Día de la semana',
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
  };
  barChartLabels: any[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      label: 'Monto total tendido por día de semana (ARS)',
      data: [],
      hoverBackgroundColor: 'rgba(75, 192, 192)'
    }
  ];
  barChartColors: Color[] = [
    'rgba(75, 192, 192, 0.7)',
  ];
  constructor(private reportService: ReportService) {
    this.year = new Date().getFullYear().toString();
    this.month = (new Date().getMonth() + 1).toString();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    console.log('chau')
    this.getInfo();
    console.log('holala')
  }


  getInfo(){
    console.log('jejej')
    this.sub.add(
      this.reportService.getTotalSalesByDayOfWeek(this.year, this.month).subscribe({
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
    )
  }

  reset(){
    this.month= "";
  }
}
