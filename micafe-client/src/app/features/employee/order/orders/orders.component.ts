import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../../../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  active= 1;
  sub: Subscription = new Subscription();
  pendingOrders: Order[];
  inProcessOrders: Order[];
  pickedUpOrders: Order[];
  inProcessCount: number;

  constructor(
    private orderService: OrdersService,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.getOrdersByStatus('pending');
    this.getOrdersByStatus('inProcess');
    this.getOrdersByStatus('pickedUp');

    this.inProcessOrderCount();
  }
  inProcessOrderCount(){
    this.inProcessCount = this.inProcessOrders.length;
  }

  getOrdersByStatus(status: string) {
    this.sub.add(
      this.orderService.getOrdersByStatus(status).subscribe({
        next: (res) => {
          if(status === 'pending'){
            this.pendingOrders = res.orders;
          } else if(status === 'inProcess'){
            this.inProcessOrders = res.orders;
            this.inProcessOrderCount();
          } else if(status === 'pickedUp'){
            this.pickedUpOrders = res.orders;
          }
          
         
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
  

}
