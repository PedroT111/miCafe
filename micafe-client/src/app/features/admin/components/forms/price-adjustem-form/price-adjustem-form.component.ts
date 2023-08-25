import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryProductService } from '../../../services/category-product.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-price-adjustem-form',
  templateUrl: './price-adjustem-form.component.html',
  styleUrls: ['./price-adjustem-form.component.css']
})
export class PriceAdjustemFormComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  categorias: CategoryProduct[] = [];
  form: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private categoryService: CategoryProductService,
    private productService: ProductsService,
    private toastr: ToastrService,
    private swal: SwalService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(-90)]]
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          if(res.ok){
            this.categorias = res.categories;
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    )
  }
  onSubmit() {
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.sub.add(
        this.productService.adjustemPrice(this.form.value).subscribe({
          next: (res) => {
            if(res.ok){
              this.toastr.success(res.msg);
              this.activeModal.close('Precios ajustados correctamente')
            }
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      )
    }
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
