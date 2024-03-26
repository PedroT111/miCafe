import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SuppliersService } from '../../services/suppliers.service';
import { Supplier } from 'src/app/shared/models/supplier';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  id: string = '';
  supplier: Supplier;
  constructor(
    private supplierService: SuppliersService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    this.getSupplierToEdit();
  }

  getSupplierToEdit() {
    if (this.id !== null) {
      this.sub.add(
        this.supplierService.getOne(this.id).subscribe({
          next: (res) => {
            this.supplier = res.supplier;
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      );
    }
  }

  updateSupplier(data: Supplier) {
    this.sub.add(
      this.supplierService.update(data).subscribe({
        next: (res) => {
          if(res.ok){
            this.toastr.success('Supplier was edited correctly');
            this.router.navigate(['/admin/suppliers'])

          }
        },
        error: (err) => {
          console.log(err)
          this.toastr.error(err.error.error);
        }
      })
    )
  }
}
