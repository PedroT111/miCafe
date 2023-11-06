import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ComboCardComponent } from './components/combo-card/combo-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MenuCategoriesMobileComponent } from './components/menu-categories-mobile/menu-categories-mobile.component';
import { MenuCategoriesComponent } from './components/menu-categories/menu-categories.component';
import { CategoryProductsSectionComponent } from './components/category-products-section/category-products-section.component';
import { QuantitySelectorComponent } from './components/quantity-selector/quantity-selector.component';
import { CartComponent } from './components/cart/cart.component';
import {ScrollSpyModule} from 'ng-spy';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ShoppingItemsComponent } from './shopping-items/shopping-items.component';
import { PickupTimeComponent } from './components/pickup-time/pickup-time.component';
import { DiscountComponent } from './components/discount/discount.component'
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { ValidateDiscountComponent } from './components/validate-discount/validate-discount.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { CombosSectionComponent } from './components/combos-section/combos-section.component';
import { ComboDetailComponent } from './components/combo-detail/combo-detail.component';
import { ComboItemComponent } from './components/combo-item/combo-item.component';
import { PointsComponentComponent } from './components/points-component/points-component.component';

@NgModule({
  declarations: [
    IndexComponent,
    ProductCardComponent,
    ComboCardComponent,
    ProductDetailComponent,
    MenuCategoriesMobileComponent,
    MenuCategoriesComponent,
    CategoryProductsSectionComponent,
    QuantitySelectorComponent,
    CartComponent,
    CartItemComponent,
    OrderSummaryComponent,
    ShoppingItemsComponent,
    PickupTimeComponent,
    DiscountComponent,
    PaymentMethodsComponent,
    ValidateDiscountComponent,
    OrderDetailsComponent,
    CombosSectionComponent,
    ComboDetailComponent,
    ComboItemComponent,
    PointsComponentComponent,
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    SharedModule,    
    ScrollSpyModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShoppingModule { }
