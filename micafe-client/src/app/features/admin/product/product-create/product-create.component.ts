import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private productService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  createProduct(p: Product) {
    this.sub.add(
      this.productService.createProduct(p).subscribe({
        next: () => {
          this.toastr.info('Producto creado correctamente');
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }
}
