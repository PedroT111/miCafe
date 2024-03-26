import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { OrdersComponent } from './order/orders/orders.component';

const routes: Routes = [
  {
   path: '', component: IndexComponent, children: [
    {path: 'orders', component: OrdersComponent}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
