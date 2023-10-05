import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { CardOrderComponent } from './components/card-order/card-order.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbAlertModule,
  NgbCollapseModule,
  NgbNavModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrdersComponent } from './order/orders/orders.component';

@NgModule({
  declarations: [
    IndexComponent,
    EmployeeNavbarComponent,
    OrdersComponent,
    CardOrderComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbAlertModule
  ]
})
export class EmployeeModule {}
