import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CartComboItem, CartProductItem } from 'src/app/shared/models/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartProductItem[];
  comboItems: CartComboItem[];
  total: number;
  constructor(
    private offCanvasService: NgbOffcanvas,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getItems();
    this.calculateTotal();
  }

  getItems(){
    this.cartItems = this.cartService.getCartItems('products');
    this.comboItems = this.cartService.getCartItems('combos');
  }

  closeCart() {
    this.offCanvasService.dismiss();
  }

  removeProduct(item: CartProductItem){
    this.cartService.removeItem(item);
    this.getItems();

    this.calculateTotal();
  }

  removeCombo(item: CartComboItem){
    this.cartService.removeCombo(item);
    this.getItems();
    this.calculateTotal();
  }

  calculateTotal(): void {  
    this.total = 0;
    this.cartItems.forEach(item => {
      if (item.product.salePrice === undefined || item.product.salePrice === null ) {
        this.total += item.product.price * item.quantity;
      } else {
        this.total += item.product.salePrice * item.quantity;
      }
    });
    this.comboItems.forEach(combo => {
      this.total += combo.combo.price * combo.quantity;
    })
  }

  confirmOrder(){
    this.closeCart();
    this.router.navigateByUrl('/shopping/order-summary');
  }
}
