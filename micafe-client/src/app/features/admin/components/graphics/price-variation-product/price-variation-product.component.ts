/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-price-variation-product',
  templateUrl: './price-variation-product.component.html',
  styleUrls: ['./price-variation-product.component.css']
})
export class PriceVariationProductComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  year: string = '2023'
  products: Product[];
  productId: string;
  inflationIndices = [
    { year: 2023, month: 8, value: 12.4 },
    { year: 2023, month: 9, value: 12.7 },
    { year: 2023, month: 10, value: 8.3 },
    { year: 2023, month: 11, value: 10 },
];
  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        beginAtZero: true
      },
    }
  };
  lineChartLabels: number[] = [];
  lineChartType: string = 'line';
  lineChartLegend: boolean = true;
  lineChartData: ChartDataset[] = [
    {
      data: [],
      fill: false,
      hoverBackgroundColor: 'rgba(4, 4, 124, 1)'
    }
  ];
  lineChartColors: Color[] = ['rgba(255, 99, 132)'];
  constructor(private reportService: ReportService, private productService: ProductsService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getInformation();
    }
  }

  getProducts(){
    this.sub.add(
      this.productService.getAllProducts().subscribe({
        next: (res) => {
          this.products = res.products;
          this.productId = res.products[0]._id;

          this.getInformation();
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  getInformation() {
    this.sub.add(
      this.reportService
        .getProductVariation(this.year, this.productId)
        .subscribe({
          next: (res: any) => {

            this.lineChartData = [
              { data: res.changePrices.map((item: any) => item.totalVariation), label: 'Price Variation' },
              { data: this.inflationIndices.map(item => item.value), label: 'Inflation index' }
            ];
            this.lineChartLabels = res.changePrices.map((item: any) => `${item.year}-${item.month}`);
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }

}
