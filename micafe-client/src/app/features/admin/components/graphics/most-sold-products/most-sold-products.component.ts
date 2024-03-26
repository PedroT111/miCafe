/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductSold } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { endOfDay, startOfMonth } from 'date-fns';

@Component({
  selector: 'app-most-sold-products',
  templateUrl: './most-sold-products.component.html',
  styleUrls: [
    './most-sold-products.component.css',
    '../../../styles/admin-style.css'
  ]
})
export class MostSoldProductsComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  mostSoldProducts: ProductSold[] = [];
  pieChartOptions: ChartOptions = {
    responsive: true
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Products',
          color: 'rgba(241, 250, 238)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(241, 250, 238)'
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
          stepSize: 1
        }
      },
      y: {
        title: {
          display: true,
          text: 'Quantity',
          color: 'rgba(241, 250, 238)',
          font: {
            size: 14
          }
        },
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
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Total quantity sold',
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  barChartColors: Color[] = [
    'rgba(42, 157, 143)',
    'rgba(233, 196, 106)',
    'rgba(244, 162, 97)',
    'rgba(214, 40, 40)',
    'rgba(231, 111, 81)',
    'rgba(180, 67, 108)',
    'rgba(255, 116, 151)',
    'rgba(255, 209, 102)',
    'rgba(58, 134, 255)',
    'rgba(255, 159, 64)',
    'rgba(192, 192, 192)',
    'rgba(0, 0, 139)'
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getMostSaleProducts();
    }
  }

  ngOnInit(): void {
    this.getMostSaleProducts();
  }

  getMostSaleProducts() {
    this.sub.add(
      this.reportService
        .getMostSoldProducts(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            this.mostSoldProducts = res.products;

            this.barChartLabels = this.mostSoldProducts.map(
              (product) => product.name
            );
            this.barChartData[0].data = this.mostSoldProducts.map(
              (product) => product.totalQuantity
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
