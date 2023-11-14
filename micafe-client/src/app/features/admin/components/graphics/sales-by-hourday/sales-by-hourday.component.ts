import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sales } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';
import { startOfMonth } from 'date-fns';

@Component({
  selector: 'app-sales-by-hourday',
  templateUrl: './sales-by-hourday.component.html',
  styleUrls: ['./sales-by-hourday.component.css']
})
export class SalesByHourdayComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  startDate: Date;
  endDate: Date;
  salesByHour: Sales[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora del Día',
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
          text: 'Total de Ventas $(ARS)',
          color: 'black',
          font: {
            size: 14
          }
        }
      }
    }
  };
  lineChartLabels: number[] = [];
  lineChartType: string = 'line';
  lineChartLegend: boolean = true;
  lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Cantidad Total Vendida Por Hora del Día',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  lineChartColors: Color[] = [
    'rgba(255, 99, 132)',
  ];
  constructor(private reportService: ReportService) {
    const currentDate = new Date();
    this.startDate = currentDate;
    this.endDate = currentDate;
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getInformation();
  }

  onDateSelection(dates: { startSale: Date; endSale: Date }) {
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;
    console.log(this.startDate, this.endDate);
    this.getInformation();
  }

  getInformation() {
    console.log(this.startDate, this.endDate)
    this.sub.add(
      this.reportService
        .getSalesByHourOfDay(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            console.log(res, 'aaa');
            this.salesByHour = res.sales;

            this.lineChartLabels = this.salesByHour.map(
              (sale) => sale._id
            );
            this.lineChartData[0].data = this.salesByHour.map(
              (sale) => sale.totalAmount
            );
            this.lineChartData[0].backgroundColor = this.lineChartColors;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }

  selectMonth(){
    const currentTime = new Date();
    this.startDate = startOfMonth(currentTime);
    this.endDate = currentTime;

    this.getInformation();
  }
}
