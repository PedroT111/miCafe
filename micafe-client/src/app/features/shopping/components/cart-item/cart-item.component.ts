import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProductItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartProductItem
  @Output() onRemove = new EventEmitter<CartProductItem>();
  constructor() { }

  ngOnInit(): void {
  }


  deleteItem(item: CartProductItem){
    console.log(item);
    this.onRemove.emit(item);
  }



}
