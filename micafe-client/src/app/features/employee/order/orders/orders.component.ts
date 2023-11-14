import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../../../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { ToastrService } from 'ngx-toastr';

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
    private swal: SwalService,
    private socketService: WebsocketService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.socketService.disconnect();
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.listenToNewOrderEvent();  
    this.getOrders();

  }

  private listenToNewOrderEvent(): void {
    this.socketService.listen('newOrder').subscribe({
      next: (data: {msg: string, order: Order}) => {
        this.toastr.info(`${data.msg}: ${data.order.orderNumber}`);
        this.getOrders();
      },
      error: (error) => {
        console.error('Error al escuchar el evento newOrder:', error);
      }
    });
  }

  getOrders(){
    this.getPickedUpOrders();
    this.getOrdersByStatus('pending');
    this.getOrdersByStatus('inProcess');

    this.inProcessOrderCount();
  }

  inProcessOrderCount(){
    this.inProcessCount = this.inProcessOrders.length;
  }

  getOrdersByStatus(status: string) {
    this.sub.add(
      this.orderService.getOrdersByStatus(status).subscribe({
        next: (res) => {
          console.log(res);
          if(status === 'pending'){
            this.pendingOrders = res;
          } else if(status === 'inProcess'){
            this.inProcessOrders = res;
            this.inProcessOrderCount();
          } 
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }

  getPickedUpOrders(){
    this.sub.add(
      this.orderService.getOrdersByStatusAndEmployee('pickedUp').subscribe({
        next: (res) => {
            this.pickedUpOrders = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }
  

}
