/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Distribution } from 'src/app/shared/models/report';
import * as ChartLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-rating-distribution',
  templateUrl: './rating-distribution.component.html',
  styleUrls: [
    './rating-distribution.component.css',
    '../../../styles/admin-style.css'
  ]
})
export class RatingDistributionComponent
  implements OnInit, OnDestroy, OnChanges
{
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  isBarChart: boolean = true;
  califications: Distribution[] = [];
  pieChartPlugins = [ChartLabels];
  pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: 'black',
        font: {
          size: 14,
          weight: 'bold'
        },
        formatter: (value, ctx) => {
          const data = ctx.dataset?.data as number[];
          if (data) {
            const total = data.reduce((acc, item) => acc + item, 0);
            if (total !== 0) {
              const percentage = ((value / total) * 100).toFixed(1) + '%';
              return percentage;
            }
          }
          return '';
        }
      }
    }
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Number of orders',
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
          text: 'Ratings',
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
      legend: {
        display: true,
        labels: {
          color: 'rgba(241, 250, 238)'
        }
      }
    }
  };
  barChartLabels: any[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Number of orders',
      fill: false,
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)'
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        'rgba(42, 157, 143)',
        'rgba(233, 196, 106)',
        'rgba(168, 218, 220)',
        'rgba(241, 250, 238)',
        'rgba(230, 57, 70)'
      ]
    }
  ];
  barChartColors: Color[] = [
    'rgba(42, 157, 143)',
    'rgba(233, 196, 106)',
    'rgba(168, 218, 220)',
    'rgba(241, 250, 238)',
    'rgba(230, 57, 70)'
  ];
  constructor(private reportService: ReportService) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCalifications();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getCalifications();
    }
  }

  getCalifications() {
    this.sub.add(
      this.reportService
        .getRatingDistribution(this.startDate, this.endDate)
        .subscribe({
          next: (res) => {
            this.califications = res.distribution;
            this.barChartLabels = this.califications.map((distribution) => {
              const calificacion = distribution._id;
              const iconClass = `*`.repeat(calificacion);
              return iconClass;
            });
            this.barChartData[0].data = this.califications.map(
              (distribution) => distribution.count
            );
            this.barChartData[0].backgroundColor = this.barChartColors;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }

  changeChart() {
    this.isBarChart = !this.isBarChart;
  }
}
