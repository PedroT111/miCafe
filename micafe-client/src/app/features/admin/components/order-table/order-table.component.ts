import { Component, Input, OnInit } from '@angular/core';
import { ORDERS } from '../../constants/order';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css','../../styles/admin-style.css']
})
export class OrderTableComponent implements OnInit {
  headers = ORDERS.ORDERS_TABLE_HEADERS;  
  page: number =1;
  pageSize: number = 8;
  @Input() orders: Order[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
