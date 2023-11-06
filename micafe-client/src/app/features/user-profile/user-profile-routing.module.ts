import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: MyprofileComponent
      },
      {
        path: 'information',
        component: UserInformationComponent
      },
      {
        path: 'order-history',
        component: OrderHistoryComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
