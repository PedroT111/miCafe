import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, Color } from 'chart.js';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { UsersByMonth } from 'src/app/shared/models/report';

@Component({
  selector: 'app-newcustomers-bymonth',
  templateUrl: './newcustomers-bymonth.component.html',
  styleUrls: ['./newcustomers-bymonth.component.css', '../../../styles/admin-style.css']
})
export class NewcustomersBymonthComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  groupBy: string;
  newCustomers: UsersByMonth[] = [];

  lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'rgba(241, 250, 238)', 
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
          stepSize: 1
        }
      },
      y: {
        min:0,
        grid: {
          color: 'rgba(241, 250, 238)', 
        },
        ticks: {
          color: 'rgba(241, 250, 238)',
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: { display: true, labels: {
        color: 'rgba(241, 250, 238)'
      } }
    }
  };
  lineChartLabels: number[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend: boolean = true;
  lineChartData: ChartDataset[] = [
    {
      data: [],
      label: 'Number of new customers',
      fill: false,
      backgroundColor: 'rgb(255, 205, 86)',
      borderColor: 'rgb(255, 205, 86)',
      borderWidth: 5,
      hoverBorderColor: 'rgb(255, 205, 86)',
      hoverBackgroundColor: 'rgb(255, 205, 86)'
    }
  ];
  lineChartColors: Color[] = ['rgb(255, 205, 86)'];

  constructor(private reportService: ReportService) {
    this.groupBy = 'day';
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getInformation();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getInformation();
    }
  }

  getInformation() {
    this.sub.add(
      this.reportService
        .getNewCustomersByPeriod(this.startDate, this.endDate, this.groupBy)
        .subscribe({
          next: (res) => {
            this.newCustomers = res.newCustomers;
            this.lineChartLabels = this.newCustomers.map((x) => x._id);
            this.lineChartData[0].data = this.newCustomers.map(
              (users) => users.newUsers
            );
            this.lineChartData[0].backgroundColor = this.lineChartColors;
          },
          error: (err) => {
            console.log(err);
          }
        })
    );
  }

  public randomize(): void {
    this.lineChartType = this.lineChartType === 'bar' ? 'line' : 'bar';
  }

}
