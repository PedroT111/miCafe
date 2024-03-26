import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FaqComponent } from './faq/faq.component';

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
      },
      {
        path: 'terms-conditions',
        component: TermsConditionsComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
