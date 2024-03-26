import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product';
import { CartService } from '../../services/cart.service';
import { CartProductItem } from 'src/app/shared/models/cart';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
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

  addProduct(){
    const item: CartProductItem = {
      product: this.product,
      quantity: this.quantity
    }
    this.cartService.addItemToCart(item);
    this.closeModal();
  }

}
