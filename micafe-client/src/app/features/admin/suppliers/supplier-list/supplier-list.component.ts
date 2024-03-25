import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Supplier } from 'src/app/shared/models/supplier';
import { SUPPLIER } from '../../constants/supplier';
import { SuppliersService } from '../../services/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  filteredData: Supplier[];
  supplierList: Supplier[];
  tableHeaders = SUPPLIER.SUPPLIER_TABLE_HEADERS;
  searchTerm: string =  '';
  constructor(
    private router: Router,
    private supplierService: SuppliersService,
    private toastr: ToastrService,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers() {
    this.sub.add(
      this.supplierService.getAll().subscribe({
        next: (res) => {
          this.supplierList = res.supplier;
          this.filteredData = this.supplierList;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  create() {
    this.router.navigate(['/admin/suppliers/new']);
  }

  delete(s: Supplier) {
    this.swal.showConfirmation(
      'Estas a punto de eliminar un proveedor, estás seguro?'
    ).then((res) => {
      if(res.isConfirmed){
        this.supplierService.delete(s._id).subscribe({
          next: () => {
            this.getSuppliers();
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        });
      }
    })
  }

  edit(s: Supplier) {
    this.router.navigate([`/admin/suppliers/edit/${s._id}`]);
  }

  applyFilters() {
    this.filteredData = this.supplierList;
    if (this.searchTerm) {
      this.filteredData = this.filteredData.filter((item) =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }
}
