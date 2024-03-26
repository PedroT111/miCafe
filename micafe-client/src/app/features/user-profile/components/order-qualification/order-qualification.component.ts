import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-qualification',
  templateUrl: './order-qualification.component.html',
  styleUrls: ['./order-qualification.component.css']
})
export class OrderQualificationComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  @Input() orderId: string;
  currentRate = 0;
  constructor(
    private NgbActiveModal: NgbActiveModal,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  qualify() {
    this.sub.add(
      this.orderService.orderRate(this.orderId, this.currentRate).subscribe({
        next: (res) => {
          this.toastr.success(res.msg);
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
    this.NgbActiveModal.close('qualification');
  }
}
