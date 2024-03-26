import { Component, OnInit } from '@angular/core';
import { EmployeeForm } from 'src/app/shared/models/employee';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css', '../../styles/admin-style.css']
})
export class EditEmployeeComponent implements OnInit {
  sub: Subscription = new Subscription();
  id: string;
  employee: EmployeeForm;
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];

    this.getEmployee();
  }

  getEmployee(){
    this.sub.add(
      this.employeeService.getEmployee(this.id).subscribe({
        next: (res) => {
          this.employee = res;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
          this.router.navigate(['/admin/employees']);
        }
      })
    )
  }

  onSubmit(employee: EmployeeForm) {
    this.sub.add(
      this.employeeService.updateEmployee(employee).subscribe({
        next: (res) => {
          if (res.ok) {
            this.toastr.success('Employee updated successfully');
            this.router.navigate(['/admin/employees']);
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }
}
