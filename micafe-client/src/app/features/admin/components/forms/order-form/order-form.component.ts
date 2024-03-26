import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css', '../../../styles/admin-style.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  @Input() order: Order;
  form: FormGroup;
  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      status: ['']
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.form.get('status')?.setValue(this.order.status);
  }

  onCancel() {
    this.activeModal.dismiss();
  }

  updateOrderStatus() {
    const status = this.form.get('status')?.value;
    this.sub.add(
      this.orderService.changeOrderStatus(this.order, status).subscribe({
        next: (res) => {
          if (res.ok) {
            this.toastr.success(res.msg);
            this.activeModal.close();
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    );
  }
}
