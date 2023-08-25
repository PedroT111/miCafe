import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './product/products/products.component';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderByComponent } from './components/order-by/order-by.component';
import { ProductFormComponent } from './components/forms/product-form/product-form.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component'; 
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { NgbPaginationModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoryProductsComponent } from './product/category-products/category-products.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { OfferFormComponent } from './components/forms/offer-form/offer-form.component';
import { NewOfferComponent } from './offers/new-offer/new-offer.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';
import { PriceAdjustemFormComponent } from './components/forms/price-adjustem-form/price-adjustem-form.component';



@NgModule({
  declarations: [
    IndexComponent,
    SideNavbarComponent,
    ProductsComponent,
    TableComponent,
    OrderByComponent,
    ProductFormComponent,
    ProductEditComponent,
    ProductCreateComponent,
    CategoryProductsComponent,
    OffersListComponent,
    OfferFormComponent,
    NewOfferComponent,
    DatepickerComponent,
    TimepickerComponent,
    EditOfferComponent,
    PriceAdjustemFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    NgbTimepickerModule
  ]
})
export class AdminModule { }
