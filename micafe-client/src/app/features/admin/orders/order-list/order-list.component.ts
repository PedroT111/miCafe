import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css', '../../styles/admin-style.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  orders: Order[];
  filteredOrders: Order[];
  searchTerm: string;
  constructor(
    private orderService: OrdersService,
    private socket: WebsocketService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.socket.connect();
    this.listenToNewOrderEvent();
    this.getOrders();
  }

  getOrders() {
    this.sub.add(
      this.orderService.getAllOrders().subscribe({
        next: (res) => {
          this.orders = res;
          this.filteredOrders = this.orders;
          console.log(res);
        }
      })
    );
  }
  private listenToNewOrderEvent(): void {
    this.socket.listen('newOrder').subscribe({
      next: (data: { msg: string; order: Order }) => {
        this.toastr.info(`${data.msg}: ${data.order.orderNumber}`);
        this.getOrders();
      },
      error: (error) => {
        console.error('Error al escuchar el evento newOrder:', error);
      }
    });
  }

  applyFilters() {
    this.filteredOrders = this.orders;
    if (this.searchTerm) {
      this.filteredOrders = this.filteredOrders.filter(
        (order) =>
          order.orderNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          order.customer.lastName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSearch(search: string) {
    this.searchTerm = search;
    this.applyFilters();
  }
}
