import { Component, OnInit } from '@angular/core';
import { Discount } from 'src/app/shared/models/discount';
import { DiscountService } from '../../../../shared/services/discount.service';

@Component({
  selector: 'app-discount-card',
  templateUrl: './discount-card.component.html',
  styleUrls: ['./discount-card.component.css', '../../styles/admin-style.css']
})
export class DiscountCardComponent implements OnInit {
  discount: Discount;
  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.discountService.discountChanges$.subscribe({
      next: (dis) => {
        this.discount = dis;
      }
    })
  }

}
