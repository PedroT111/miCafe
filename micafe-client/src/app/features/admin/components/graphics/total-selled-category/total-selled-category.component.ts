import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { CategorySale } from 'src/app/shared/models/report';

@Component({
  selector: 'app-total-selled-category',
  templateUrl: './total-selled-category.component.html',
  styleUrls: ['./total-selled-category.component.css']
})
export class TotalSelledCategoryComponent
  implements OnInit, OnDestroy, OnChanges
{
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  categorySales: CategorySale[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Total sales amount ARS',
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
    'rgba(50, 205, 50)'
  ];
  constructor(private reportService: ReportService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      console.log(this.startDate, this.endDate);
      this.getCategorySales();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategorySales();
  }

  getCategorySales() {
    this.sub.add(
      this.reportService
        .getCategorySales(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            console.log(res, 'res cat')
            this.categorySales = res.categories;

            this.barChartLabels = this.categorySales.map((c) => c.categoryName);
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
