import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { UserSummary } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { CUSTOMERS } from '../../constants/customers';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { SortBy } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css', '../../styles/admin-style.css']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  customers: UserSummary[];
  filteredData: UserSummary[];
  sorting = CUSTOMERS.SORTING;
  sortSelected: SortBy | null;
  tableHeaders = CUSTOMERS.CUSTOMERS_TABLE_HEADERS;
  searchTerm: string = '';
  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.sub.add(
      this.customerService.getAllCustomers().subscribe({
        next: (res) => {
          this.customers = res;
          this.filteredData = this.customers;
          console.log(res)
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  applyFilters() {
    this.filteredData = this.customers;
    if (this.searchTerm) {
      this.filteredData = this.filteredData.filter(
        (user) =>
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.lastName
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.name.toLocaleLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteUser(user: UserSummary) {
    console.log(user);
    this.swal
      .showConfirmation(
        'Estás a punto de eliminar este usuario de forma permanente. ¿Deseas continuar?'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.sub.add(
            this.customerService.deleteUser(user).subscribe({
              next: (res) => {
                this.toastr.success(res.msg);
                this.getCustomers();
              },
              error: (err) => {
                this.toastr.error(err.error.error);
              }
            })
          );
        }
      });
  }
  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  sortList(sort: SortBy) {
    this.sortSelected = sort;
    this.filteredData = this.filteredData.sort((a, b) => {
      let comparison = 0;
      if (sort.sort === 'name') {
        comparison = a.lastName.localeCompare(b.lastName);
      }
      return sort.asc ? comparison : -comparison;
    });
  }
}
