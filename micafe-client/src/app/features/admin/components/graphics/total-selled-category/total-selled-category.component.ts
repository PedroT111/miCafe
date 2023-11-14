import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { endOfDay, startOfMonth } from 'date-fns';
import { CategorySale } from 'src/app/shared/models/report';

@Component({
  selector: 'app-total-selled-category',
  templateUrl: './total-selled-category.component.html',
  styleUrls: ['./total-selled-category.component.css']
})
export class TotalSelledCategoryComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  startDate: Date;
  endDate: Date;
  categorySales: CategorySale[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Ventas (ARS)',
          color: 'black',
          font: {
            size: 14
          }
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Cantidad Total Vendida',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  barChartColors: Color[] = [
    'rgba(255, 99, 132)',
    'rgba(54, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(50, 205, 50)',
  ];
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
    this.getCategorySales();
  }

  onDateSelection(dates: { startSale: Date; endSale: Date }) {
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;
    this.getCategorySales();
  }

  getCategorySales() {
    this.sub.add(
      this.reportService
        .getCategorySales(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.categorySales = res.categories;

            this.barChartLabels = this.categorySales.map(
              (c) => c.categoryName
            );
            this.barChartData[0].data = this.categorySales.map(
              (c) => c.totalAmount
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
