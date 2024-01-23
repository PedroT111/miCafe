import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { Distribution } from 'src/app/shared/models/report';
import { ReportService } from '../../../services/report.service';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-rating-distribution-employee',
  templateUrl: './rating-distribution-employee.component.html',
  styleUrls: [
    './rating-distribution-employee.component.css',
    '../../../styles/admin-style.css'
  ]
})
export class RatingDistributionEmployeeComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  califications: Distribution[] = [];
  employeeId: string;
  employeeList: Employee[];
  avgCalifications: number;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
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
          color: 'rgba(241, 250, 238)',
          stepSize: 1
        }
      },
      y: {
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
  barChartLabels: string[] = [];
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  barChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Number of orders',
      fill: false,
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
  constructor(
    private reportService: ReportService,
    private employeeService: EmployeeService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getCalifications() {
    console.log(this.employeeId);
    this.sub.add(
      this.reportService
        .getRatingDistributionByEmployee(this.employeeId)
        .subscribe({
          next: (res) => {
            this.califications = res.distribution.ratingDistribution;
            this.avgCalifications = Number(
              res.distribution.averageRating.toFixed(2)
            );
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

  getEmployees() {
    this.sub.add(
      this.employeeService.getAllEmployees().subscribe({
        next: (res) => {
          this.employeeList = res;
          this.employeeId = this.employeeList[0]._id;

          this.getCalifications();
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
