/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Discount } from 'src/app/shared/models/discount';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnChanges {
  @Input() total: number = 0;
  @Input() points: number = 0;
  @Input() discount: Discount | undefined;
  @Input() payWithPoints: boolean;
  totalToPay: number = 0;
  totalDiscount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalToPay = this.total;
    if(changes['discount'] && changes['discount'].currentValue){
      if(this.discount?.discountType === 'fixedAmount'){
        this.totalDiscount = this.discount.value;
        this.totalToPay = this.total - this.totalDiscount;
      }
      if(this.discount?.discountType === 'percentage'){
        this.totalDiscount = (this.discount.value/100) * this.total;
        this.totalToPay = this.total - this.totalDiscount;
      }
    }

    if(changes['payWithPoints'] && changes['payWithPoints'].currentValue){
      if(this.payWithPoints === true){
        this.totalToPay = 0;
      }
    }
  }

  

}
