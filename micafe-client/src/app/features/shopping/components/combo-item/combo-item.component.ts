import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartComboItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-combo-item',
  templateUrl: './combo-item.component.html',
  styleUrls: ['./combo-item.component.css']
})
export class ComboItemComponent implements OnInit {
  @Input() cartItem: CartComboItem;
  @Output() onRemove = new EventEmitter<CartComboItem>();
  constructor() { }

  ngOnInit(): void {
  }


  deleteItem(item: CartComboItem){
    this.onRemove.emit(item);
  }

}
