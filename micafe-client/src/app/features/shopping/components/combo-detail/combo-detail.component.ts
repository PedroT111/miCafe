import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Combo } from 'src/app/shared/models/combo';
import { CartService } from '../../services/cart.service';
import { CartComboItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-combo-detail',
  templateUrl: './combo-detail.component.html',
  styleUrls: ['./combo-detail.component.css']
})
export class ComboDetailComponent implements OnInit {
  @Input() combo: Combo;
  quantity: number = 1;
  constructor(private activeModal: NgbActiveModal, private cartService: CartService) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.dismiss();
  }
  selectQuantity(q: number){
    this.quantity = q;
  }

  addCombo(){
    const item: CartComboItem = {
      combo: this.combo,
      quantity: this.quantity
    }
    this.cartService.addComboToCart(item);
    this.closeModal();
  }

}
