import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PAGES } from 'src/app/shared/constants';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css', '../../styles/admin-style.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  createProduct(p: Product) {
    this.sub.add(
      this.productService.createProduct(p).subscribe({
        next: () => {
          this.router.navigate([`/admin/${PAGES.ADMIN_PRODUCTS}`]);
          this.toastr.info('Producto creado correctamente');
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }
}
