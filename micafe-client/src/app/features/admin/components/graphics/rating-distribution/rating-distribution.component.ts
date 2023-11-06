/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { endOfDay, startOfYear } from 'date-fns';
import { Distribution } from 'src/app/shared/models/report';
import * as ChartLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-rating-distribution',
  templateUrl: './rating-distribution.component.html',
  styleUrls: ['./rating-distribution.component.css']
})
export class RatingDistributionComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  startDate: Date;
  endDate: Date;
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
          text: 'Cantidad de Pedidos',
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
          text: 'Calificaciones',
          color: 'black',
          font: {
            size: 14
          }
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
      label: 'Cantidad de Pedidos',
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
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)'
      ]
    }
  ];
  barChartColors: Color[] = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)'
  ];
  constructor(private reportService: ReportService) {
    const currentDate = new Date();
    const firstDayOfMonth = startOfYear(currentDate);
    this.startDate = new Date(firstDayOfMonth);
    const today = endOfDay(currentDate);
    this.endDate = new Date(today);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCalifications();
  }

  onDateSelection(dates: { startSale: Date; endSale: Date }) {
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;
    console.log(this.startDate, this.endDate);
    this.getCalifications();
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
}
