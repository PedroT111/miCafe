import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/shared/models/product';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openProductDetil(){
    const modalRef = this.modalService.open(ProductDetailComponent, {
      centered: true,
    });
    modalRef.componentInstance.product = this.product;

    modalRef.result.then(
      () => {
        
      }
    )
  }
}
