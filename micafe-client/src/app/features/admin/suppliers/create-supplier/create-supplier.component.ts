import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/app/shared/models/supplier';
import { SuppliersService } from '../../services/suppliers.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.css']
})
export class CreateSupplierComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private supplierService: SuppliersService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  createNewSupplier(data: Supplier) {
    this.sub.add(
      this.supplierService.createSupplier(data).subscribe({
        next: (res) => {
          if (res.ok) {
            this.toastr.success(`Proveedor ${res.supplier.name} creado exitosamente`);
            this.router.navigate(['/admin/suppliers'])
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }
}
