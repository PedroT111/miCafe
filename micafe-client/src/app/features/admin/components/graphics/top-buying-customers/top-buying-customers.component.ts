import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { CustomerInfo } from 'src/app/shared/models/report';

@Component({
  selector: 'app-top-buying-customers',
  templateUrl: './top-buying-customers.component.html',
  styleUrls: ['./top-buying-customers.component.css', '../../../styles/admin-style.css']
})
export class TopBuyingCustomersComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  @Input() startDate: Date;
  @Input() endDate: Date;
  customersInfo: CustomerInfo[];
  constructor(private reportService: ReportService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDate'].currentValue || changes['endDate'].currentValue) {
      this.getInformation();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  getInformation(){
    this.sub.add(
      this.reportService.getTopBuyingCustomers(this.startDate, this.endDate).subscribe({
        next: (res) => {
          this.customersInfo = res.customers;
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

}
