/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartComboItem, CartProductItem } from 'src/app/shared/models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartProductItem[]> = new BehaviorSubject<
    CartProductItem[]
  >([]);
  public cartItems: Observable<CartProductItem[]> =
    this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(localStorageKey: string): any[] {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems ? JSON.parse(storedItems) : [];
  }



  addItemToCart(item: CartProductItem) {
    const currentItems = this.getCartItems('products');
    const existingItemIndex = currentItems.findIndex(
      (i) => i.product._id === item.product._id
    );
    const updatedItems = [...currentItems];
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += item.quantity;
    } else {
      updatedItems.push(item);
    }
    this.updateCartState(updatedItems, 'products');
  }

  addComboToCart(item: CartComboItem ){
    const currentItems = this.getCartItems('combos');
    const existingItemIndex = currentItems.findIndex(
      (i) => i.combo._id === item.combo._id
    );
    const updatedItems = [...currentItems];
    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += item.quantity;
    } else {
      updatedItems.push(item);
    }
    this.updateCartState(updatedItems, 'combos');
  }

  updateCartState(items: CartProductItem[], localStorageKey: string) {
    this.cartItemsSubject.next(items);
    localStorage.setItem(localStorageKey, JSON.stringify(items));
  }

  removeItem(item: CartProductItem){
    const currentItems = this.getCartItems('products');
    const updatedItems = currentItems.filter(itemCart => itemCart.product._id !== item.product._id);

    this.updateCartState(updatedItems, 'products');
  }

  removeCombo(item: CartComboItem){
    const currentItems = this.getCartItems('combos');
    const updatedItems = currentItems.filter(itemCart => itemCart.combo._id !== item.combo._id);

    this.updateCartState(updatedItems, 'combos');
  }

  cleanCart(){
    localStorage.removeItem('products');
    localStorage.removeItem('combos');
  }
}
