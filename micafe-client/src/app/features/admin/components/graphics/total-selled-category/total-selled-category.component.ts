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
  styleUrls: ['./total-selled-category.component.css', '../../../styles/admin-style.css']
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
      x: {
        grid: {
          color: 'rgba(241, 250, 238)', 
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
        }  
      },
      y: {
        grid: {
          color: 'rgba(241, 250, 238)',
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
        }
      },
    },
    plugins: {
      legend: { display: true, labels: {
        color: 'rgba(241, 250, 238)'
      } }
    }
    
  };
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: {
        color: 'rgba(241, 250, 238)'
      } }
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
    'rgba(42, 157, 143)',
    'rgba(233, 196, 106)',
    'rgba(244, 162, 97)',
    'rgba(57, 0, 153)'
  ];
  constructor(private reportService: ReportService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
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
