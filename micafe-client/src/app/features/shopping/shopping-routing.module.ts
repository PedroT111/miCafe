import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ShoppingItemsComponent } from './shopping-items/shopping-items.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '', component: ShoppingItemsComponent
      },
      {
        path: 'order-summary', component: OrderSummaryComponent
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
