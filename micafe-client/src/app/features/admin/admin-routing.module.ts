import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { OffersListComponent } from './offers/offers-list/offers-list.component';
import { NewOfferComponent } from './offers/new-offer/new-offer.component';
import { EditOfferComponent } from './offers/edit-offer/edit-offer.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'products/edit/:id', component: ProductEditComponent },
      { path: 'products/new', component: ProductCreateComponent },
      {path: 'offers', component: OffersListComponent},
      {path: 'offers/new', component: NewOfferComponent},
      {path: 'offers/edit/:id', component: EditOfferComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
