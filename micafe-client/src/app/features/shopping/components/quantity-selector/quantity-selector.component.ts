import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-selector.component.html',
  styleUrls: ['./quantity-selector.component.css']
})
export class QuantitySelectorComponent implements OnInit {
  @Input() quantity: number;
  @Output() quantityChange = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
 

  increment() {
    this.quantity++;
    this.emitQuantity();
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
      this.emitQuantity();
    }
  }

  private emitQuantity() {
    this.quantityChange.emit(this.quantity);
  }

}
