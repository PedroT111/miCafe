import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { PAGES } from 'src/app/shared/constants';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css', '../../styles/admin-style.css']
})
export class ProductEditComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();

  constructor(
    private productService: ProductsService,
    private toastr: ToastrService,
    private router: Router,
    private swalService: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  updateProduct(p: Product) {
    this.swalService
      .showConfirmation(
        '"Estás a punto de guardar los cambios en este producto. ¿Deseas continuar?"'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.sub.add(
            this.productService.editProduct(p).subscribe({
              next: (res) => {
                if (res.ok == true) {
                  this.router.navigate([`/admin/${PAGES.ADMIN_PRODUCTS}`]);
                  this.toastr.success('Producto actualizado correctamente!');
                }
              },
              error: (err) => {
                this.toastr.error(err.error.error);
              }
            })
          );
        }
      });
  }
}
