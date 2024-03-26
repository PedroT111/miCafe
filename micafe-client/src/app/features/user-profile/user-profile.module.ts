import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { IndexComponent } from './index/index.component';
import { ProfileFormComponent } from './components/forms/profile-form/profile-form.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderComponent } from './components/order/order.component';
import { NgbCollapseModule, NgbDatepickerModule, NgbRatingModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountMobileComponent } from './account-mobile/account-mobile.component';
import { OrderQualificationComponent } from './components/order-qualification/order-qualification.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { FaqComponent } from './faq/faq.component';




@NgModule({
  declarations: [
    IndexComponent,
    ProfileFormComponent,
    AccountMobileComponent,
    UserInformationComponent,
    MyprofileComponent,
    OrderHistoryComponent,
    OrderComponent,
    OrderQualificationComponent,
    DatepickerComponent,
    TermsConditionsComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbRatingModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,

  ]
})
export class UserProfileModule { }
