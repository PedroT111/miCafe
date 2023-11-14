import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../../../shared/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnChanges {
  active = 1;
  sub: Subscription = new Subscription();
  @Input() orders: Order[];
  @Output() onChangeStatus = new EventEmitter();
  filteredOrders: Order[];
  searchTerm: string = '';
  pageSize: number = 12;
  page: number = 1;
  dataSize: number;
  constructor(
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orders'].currentValue) {
      this.filteredOrders = this.orders;
      this.applyFilter();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onSearch(search: string) {
    this.searchTerm = search;

    this.applyFilter();
  }

  pageChanged(page: number) {
    this.page = page;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredOrders = this.orders;
    if (this.searchTerm) {
      this.filteredOrders = this.filteredOrders.filter(
        (order) =>
          order.orderNumber
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          order.customer.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          order.customer.lastName
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }

    this.dataSize = this.filteredOrders.length;
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.filteredOrders = this.filteredOrders.slice(startIndex, endIndex);
  }

  changeStatus(order: Order) {
    let status: string;
    let serviceObservable;
  
    if (order.status === 'pending') {
      status = 'inProcess';
      serviceObservable = this.orderService.assingOrderToEmployee(order);
    } else if (order.status === 'inProcess') {
      status = 'pickedUp';
      serviceObservable = this.orderService.changeOrderStatus(order, status);
    }
  
    if (serviceObservable) {
      this.sub.add(
        serviceObservable.subscribe({
          next: (res) => {
            if (res.ok) {
              this.onChangeStatus.emit();
              this.toastr.success(`La orden ${order.orderNumber} ha cambiado su estado a: ${status}`);
            }
          },
          error: (err) => {
            console.log(err);
          }
        })
      );
    }
  }
  
}
