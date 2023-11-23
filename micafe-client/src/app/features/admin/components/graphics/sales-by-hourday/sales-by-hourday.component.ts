import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { Sales } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-sales-by-hourday',
  templateUrl: './sales-by-hourday.component.html',
  styleUrls: ['./sales-by-hourday.component.css']
})
export class SalesByHourdayComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  salesByHour: Sales[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time of day',
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
      }
    }
  };
  lineChartLabels: number[] = [];
  lineChartType: string = 'line';
  lineChartLegend: boolean = true;
  lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Total sales amount ARS',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  lineChartColors: Color[] = ['rgba(255, 99, 132)'];
  constructor(private reportService: ReportService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getInformation();
    }
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
        .getSalesByHourOfDay(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            this.salesByHour = res.sales;

            this.lineChartLabels = this.salesByHour.map((sale) => sale._id);
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
}
