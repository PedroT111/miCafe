/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/shared/models/order';
import { OrderFormComponent } from '../forms/order-form/order-form.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderEmployeeFormComponent } from '../forms/order-employee-form/order-employee-form.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit, OnDestroy {
  @Input() order: Order;
  @Output() onChanged = new EventEmitter<string>();
  sub: Subscription = new Subscription();
  constructor(
    private ngbModal: NgbModal,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(component: Type<any>) {
    const modalRef = this.ngbModal.open(component, {
      centered: true
    });
  
    const modalRefInstance = modalRef.componentInstance;
    modalRefInstance.order = this.order;
  
    modalRef.result.then(() => {
      this.onChanged.emit();
    });
  }
  

  ngOnInit(): void {}

  updateStatus() {
    this.openModal(OrderFormComponent);
  }

  updateEmployee(){
    this.openModal(OrderEmployeeFormComponent);
  }

  back() {
    this.router.navigate(['/admin/orders']);
  }
}
