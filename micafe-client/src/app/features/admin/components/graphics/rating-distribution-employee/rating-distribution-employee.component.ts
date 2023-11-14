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
  styleUrls: ['./rating-distribution-employee.component.css']
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
          text: 'Calificaciones',
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
          text: 'Cantidad de Pedidos',
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
            this.avgCalifications = res.distribution.averageRating;
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
          this.employeeId = this.employeeList[0]._id

          this.getCalifications();
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
