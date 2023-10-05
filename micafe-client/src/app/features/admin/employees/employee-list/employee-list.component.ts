import { Component, OnDestroy, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee';
import { EMPLOYEES } from '../../constants/employees';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  employees: Employee[];
  filteredEmployees: Employee[];
  headers = EMPLOYEES.EMPLOYEES_TABLE_HEADERS;
  searchTerm: string;
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private route: Router,
    private swal: SwalService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.sub.add(
      this.employeeService.getAllEmployees().subscribe({
        next: (res) => {
          this.employees = res;
          this.filteredEmployees = this.employees;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  applyFilters(){
    this.filteredEmployees = this.employees;
    if (this.searchTerm) {
      this.filteredEmployees = this.filteredEmployees.filter(
        (user) =>
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.lastName
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          user.name.toLocaleLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }
  onDelete(employee: Employee) {
    this.swal.showConfirmation(
      'Estás a punto de eliminar un empleado'
    ).then((res) => {
      if(res.isConfirmed){
        this.sub.add(
          this.employeeService.deleteEmployee(employee._id).subscribe({
            next: (res) => {
              this.toastr.success(res.msg);
              this.getEmployees();
            },
            error: (err) => {
              this.toastr.error(err.error.error);
            }
          })
        )
      }
    })
    console.log(employee);
   }

   updateEmployee(employee: Employee){
    console.log(employee)
    this.route.navigate([`/admin/employees/${employee._id}`])
   }
}
