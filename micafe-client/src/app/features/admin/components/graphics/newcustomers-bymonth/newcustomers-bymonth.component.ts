import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { UsersByMonth } from 'src/app/shared/models/report';

@Component({
  selector: 'app-newcustomers-bymonth',
  templateUrl: './newcustomers-bymonth.component.html',
  styleUrls: ['./newcustomers-bymonth.component.css']
})
export class NewcustomersBymonthComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  year: string;
  newCustomers: UsersByMonth[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo (Meses)',
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
          text: 'Cantidad de Nuevos Clientes Registrados',
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
      label: 'Cantidad de Nuevos Clientes',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  lineChartColors: Color[] = ['rgba(255, 99, 132)'];
  
  constructor(private reportService: ReportService) {
    const currentDate = new Date();
    this.year = currentDate.getFullYear().toString();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getInformation();
  }

  getInformation() {
    this.sub.add(
      this.reportService
        .getNewCustomersByMonth(this.year)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.newCustomers = res.newCustomers;
            this.lineChartLabels = this.newCustomers.map((month) => month._id);
            this.lineChartData[0].data = this.newCustomers.map(
              (users) => users.newUsers
            );
            this.lineChartData[0].backgroundColor = this.lineChartColors;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }

}
