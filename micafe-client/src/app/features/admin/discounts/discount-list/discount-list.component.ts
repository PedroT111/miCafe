import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiscountService } from '../../../../shared/services/discount.service';
import { Discount, DiscountSummary } from 'src/app/shared/models/discount';
import { DISCOUNTS } from '../../constants/discounts';
import { SortBy } from 'src/app/shared/models/filter';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css','../../styles/admin-style.css']
})
export class DiscountListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  discounts: DiscountSummary[];
  filteredDiscounts: DiscountSummary[];
  headers = DISCOUNTS.DISCOUNT_TABLE_HEADERS;
  sorting = DISCOUNTS.SORTING;
  sortSelected: SortBy;
  selectedStatusFilter: string;
  searchTerm: string;
  filterStatusOptions = [
    { _id: 'active', name: 'Active' },
    { _id: 'expired', name: 'Expired' }
  ];
  constructor(
    private discountService: DiscountService,
    private toastr: ToastrService,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts() {
    this.sub.add(
      this.discountService.getAllDiscounts().subscribe({
        next: (res) => {
          this.discounts = res;
          this.filteredDiscounts = this.discounts;
          console.log(this.filteredDiscounts);
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
  applyFilters() {
    this.filteredDiscounts = this.discounts;
    if (this.searchTerm) {
      this.filteredDiscounts = this.filteredDiscounts.filter(
        (item) =>
          item.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedStatusFilter) {
      this.filteredDiscounts = this.filteredDiscounts.filter(
        (item) => item.status == this.selectedStatusFilter
      );
    }
  }
  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onStatusFilterSelected(status: string) {
    this.selectedStatusFilter = status;
    this.applyFilters();
  }

  sortList(sort: SortBy) {
    this.sortSelected = sort;
    this.filteredDiscounts = this.filteredDiscounts.sort((a, b) => {
      let comparison = 0;
      if (sort.sort === 'count') {
        comparison = a.count - b.count;
      } else if (sort.sort === 'expirationDate') {
        comparison =
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime();
      }
      return sort.asc ? comparison : -comparison;
    });
  }

  onDelete(discount: Discount) {
    this.swal
      .showConfirmation('You are about to delete a discount')
      .then((res) => {
        if (res.isConfirmed) {
          this.sub.add(
            this.discountService.deleteDiscount(discount.code).subscribe({
              next: (res) => {
                this.toastr.success(res.msg);
                this.getDiscounts();
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
