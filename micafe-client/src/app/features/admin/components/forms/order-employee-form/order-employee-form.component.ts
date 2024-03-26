import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/shared/models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-employee-form',
  templateUrl: './order-employee-form.component.html',
  styleUrls: ['./order-employee-form.component.css']
})
export class OrderEmployeeFormComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  @Input() order: Order;
  employees: Employee[];
  form: FormGroup;
  constructor(
    private ngbModal: NgbActiveModal,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      employee: ['']
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getEmployees();
    this.form.get('employee')?.setValue(this.order.employee?._id);
  }
  
  getEmployees(){
    this.sub.add(
      this.employeeService.getAllEmployees().subscribe({
        next: (res) => {
          this.employees = res;
        },
        error: (err) => {
          console.log(err)
        }
      })
    )
  }
  onCancel() {
    this.ngbModal.dismiss();
  }

  changeEmployee() {
    const employee = this.form.get('employee')?.value
    this.sub.add(
      this.orderService.updateOrderEmployee(this.order, employee).subscribe({
        next: (res) =>{
            if(res.ok){
              this.toastr.success('Orden actualizada correctamente');
              this.ngbModal.close();
            }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }
}
