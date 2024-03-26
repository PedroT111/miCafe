import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  idOrder: string;
  order: Order;
  constructor(
    private orderService: OrdersService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.idOrder = this.actRoute.snapshot.params['id'];
    this.getOrder();
  }

  getOrder() {
    this.sub.add(
      this.orderService.getOneOrder(this.idOrder).subscribe({
        next: (res) => {
          this.order = res;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  orderChanged() {
    this.getOrder();

  }
}
