/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-average-rating-variation',
  templateUrl: './average-rating-variation.component.html',
  styleUrls: [
    './average-rating-variation.component.css',
    '../../../styles/admin-style.css'
  ]
})
export class AverageRatingVariationComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
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
          text: 'Average rating',
          color: 'rgba(241, 250, 238)',
          font: {
            size: 14
          }
        },
        min: 0,
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
  lineChartLabels: string[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend: boolean = true;
  lineChartData: ChartDataset[] = [];
  year: string;
  constructor(private reportService: ReportService) {
    this.year = new Date().getFullYear().toString();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.sub.add(
      this.reportService
        .getMonthAvgCalificationsEmployeeByYear(this.year)
        .subscribe({
          next: (res) => {
            const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ];

            const datasets = res.avg.map((employeeData: any, index: any) => {
              const employee = employeeData.employee;
              const avgData = new Array(12).fill(0);

              employeeData.promediosMensuales.forEach((item: any) => {
                const monthIndex = item.month - 1;
                avgData[monthIndex] = item.avg;
              });

              const filterData = avgData.map((value) =>
                value === 0 ? NaN : value
              );
              return {
                label: `${employee.name} ${employee.lastName}`,
                data: filterData,
                fill: false
              };
            });

            this.lineChartLabels = months;
            this.lineChartData = datasets;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }
}
