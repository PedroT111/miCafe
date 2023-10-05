import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { NewOfferComponent } from './offers/new-offer/new-offer.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';
import { CategoryListComponent } from './categoryProducts/category-list/category-list.component';
import { CustomersListComponent } from './customers/customers-list/customers-list.component';
import { CombosListComponent } from './combos/combos-list/combos-list.component';
import { CreateComboComponent } from './combos/create-combo/create-combo.component';
import { EditComboComponent } from './combos/edit-combo/edit-combo.component';
import { DiscountListComponent } from './discounts/discount-list/discount-list.component';
import { CreateDiscountComponent } from './discounts/create-discount/create-discount.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'products/new', component: ProductCreateComponent },
      { path: 'offers', component: OffersListComponent },
      { path: 'offers/new', component: NewOfferComponent },
      { path: 'offers/edit/:id', component: EditOfferComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'customers', component: CustomersListComponent },
      { path: 'combos', component: CombosListComponent },
      { path: 'combos/new', component: CreateComboComponent },
      { path: 'combos/edit/:id', component: EditComboComponent },
      { path: 'discounts', component: DiscountListComponent },
      { path: 'discounts/new', component: CreateDiscountComponent },
      {path: 'employees', component: EmployeeListComponent},
      {path: 'employees/new', component: CreateEmployeeComponent},
      {path: 'employees/:id', component: EditEmployeeComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
