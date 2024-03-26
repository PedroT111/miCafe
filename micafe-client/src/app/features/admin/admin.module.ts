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
import { NgbPaginationModule, NgbDatepickerModule, NgbTimepickerModule, NgbDropdownModule, NgbDateNativeAdapter, NgbDateAdapter, NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { OfferFormComponent } from './components/forms/offer-form/offer-form.component';
import { NewOfferComponent } from './offers/new-offer/new-offer.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';
import { PriceAdjustemFormComponent } from './components/forms/price-adjustem-form/price-adjustem-form.component';
import { CategoryListComponent } from './categoryProducts/category-list/category-list.component';
import { OfferCategoryFormComponent } from './components/forms/offer-category-form/offer-category-form.component';
import { CategoryFormComponent } from './components/forms/category-form/category-form.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CombosListComponent } from './combos/combos-list/combos-list.component';
import { CreateComboComponent } from './combos/create-combo/create-combo.component';
import { ComboFormComponent } from './components/forms/combo-form/combo-form.component';
import { EditComboComponent } from './combos/edit-combo/edit-combo.component';
import { DiscountListComponent } from './discounts/discount-list/discount-list.component';
import { CreateDiscountComponent } from './discounts/create-discount/create-discount.component';
import { DiscountFormComponent } from './components/forms/discount-form/discount-form.component';
import { DiscountCardComponent } from './components/discount-card/discount-card.component';
import { DiscountFiltersFormComponent } from './components/forms/discount-filters-form/discount-filters-form.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EmployeeFormComponent } from './components/forms/employee-form/employee-form.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { OrderInfoComponent } from './orders/order-info/order-info.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { OrderFormComponent } from './components/forms/order-form/order-form.component';
import { OrderEmployeeFormComponent } from './components/forms/order-employee-form/order-employee-form.component';
import {NgChartsModule} from 'ng2-charts';
import { SaleReportsComponent } from './sale-reports/sale-reports.component';
import { MostSoldProductsComponent } from './components/graphics/most-sold-products/most-sold-products.component';
import { TotalSellPeriodComponent } from './components/graphics/total-sell-period/total-sell-period.component';
import { SaleByWeekdayComponent } from './components/graphics/sale-by-weekday/sale-by-weekday.component';
import { RatingDistributionComponent } from './components/graphics/rating-distribution/rating-distribution.component';
import { SalesByHourdayComponent } from './components/graphics/sales-by-hourday/sales-by-hourday.component';
import { RatingDistributionEmployeeComponent } from './components/graphics/rating-distribution-employee/rating-distribution-employee.component';
import { AverageRatingVariationComponent } from './components/graphics/average-rating-variation/average-rating-variation.component';
import { TotalSelledCategoryComponent } from './components/graphics/total-selled-category/total-selled-category.component';
import { NewcustomersBymonthComponent } from './components/graphics/newcustomers-bymonth/newcustomers-bymonth.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list.component';
import { CreateSupplierComponent } from './suppliers/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './suppliers/edit-supplier/edit-supplier.component';
import { SupplierFormComponent } from './components/forms/supplier-form/supplier-form.component';
import { ReportDataComponent } from './components/report-data/report-data.component';
import { CustomerReportsComponent } from './customer-reports/customer-reports.component';
import { EmployeeReportsComponent } from './employee-reports/employee-reports.component';
import { TopBuyingCustomersComponent } from './components/graphics/top-buying-customers/top-buying-customers.component';
import { PriceVariationProductComponent } from './components/graphics/price-variation-product/price-variation-product.component';


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
    OffersListComponent,
    OfferFormComponent,
    NewOfferComponent,
    DatepickerComponent,
    TimepickerComponent,
    EditOfferComponent,
    PriceAdjustemFormComponent,
    CategoryListComponent,
    OfferCategoryFormComponent,
    CategoryFormComponent,
    CustomersListComponent,
    CombosListComponent,
    CreateComboComponent,
    ComboFormComponent,
    EditComboComponent,
    DiscountListComponent,
    CreateDiscountComponent,
    DiscountFormComponent,
    DiscountCardComponent,
    DiscountFiltersFormComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    EditEmployeeComponent,
    EmployeeFormComponent,
    OrderListComponent,
    OrderTableComponent,
    OrderInfoComponent,
    OrderCardComponent,
    OrderFormComponent,
    OrderEmployeeFormComponent,
    SaleReportsComponent,
    MostSoldProductsComponent,
    TotalSellPeriodComponent,
    SaleByWeekdayComponent,
    RatingDistributionComponent,
    SalesByHourdayComponent,
    RatingDistributionEmployeeComponent,
    AverageRatingVariationComponent,
    TotalSelledCategoryComponent,
    NewcustomersBymonthComponent,
    SupplierListComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    SupplierFormComponent,
    ReportDataComponent,
    CustomerReportsComponent,
    EmployeeReportsComponent,
    TopBuyingCustomersComponent,
    PriceVariationProductComponent,
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
    NgbTimepickerModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgChartsModule,
    NgbCollapseModule
  ],
  providers: [
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter,
    }
    
  ]
})
export class AdminModule { }
