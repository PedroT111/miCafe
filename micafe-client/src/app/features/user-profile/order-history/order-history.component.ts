import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  orders: Order[];
  user: User | null;
  constructor(
    private orderService: OrdersService,
    private authService: AuthService,
    private socketService: WebsocketService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.user = this.authService.getUserData();
    this.listenToOrderEvent();
    this.getOrders();
  }

  private listenToOrderEvent(): void {
    this.socketService.listen('updatedOrder').subscribe({
      next: () => {
        this.getOrders();
      },
      error: (error) => {
        console.error('Error al escuchar el evento newOrder:', error);
      }
    });
  }
  getOrders() {
    if (this.user !== null) {
      this.sub.add(
        this.orderService.getOrdersByUser(this.user).subscribe({
          next: (res) => {
            this.orders = res;
          },
          error: (err) => {
            console.log(err);
          }
        })
      );
    }
  }
}
