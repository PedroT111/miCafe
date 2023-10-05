import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { EmployeeForm } from 'src/app/shared/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css', '../../styles/admin-style.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  onSubmit(employee: EmployeeForm){
    this.sub.add(
      this.employeeService.createNewEmployee(employee).subscribe({
        next: (res) => {
          if(res.ok){
            this.toastr.success('Employee created successfully');
            this.router.navigate(['/admin/employees']);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    )
  }
}
