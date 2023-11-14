import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/shared/models/order';
import { OrderQualificationComponent } from '../order-qualification/order-qualification.component';
import { DatepickerComponent } from '../datepicker/datepicker.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;
  isCollapsed = true;
  @Output() onQualificate = new EventEmitter();
  constructor(private ngbModal: NgbModal) {}

  ngOnInit(): void {}

  qualificationOrder() {
    const modalRef = this.ngbModal.open(OrderQualificationComponent, {
      centered: true
    });
    modalRef.componentInstance.orderId = this.order._id;

    modalRef.result.then(() => {
      this.onQualificate.emit();
    });
  }

  updateDateTime(){
    const modalRef = this.ngbModal.open(DatepickerComponent, {
      centered: true
    });
    modalRef.componentInstance.orderDate = this.order.pickUpDateTime;
    modalRef.componentInstance.orderId = this.order._id;

    modalRef.result.then(() => {
      this.onQualificate.emit();
    });
  }
}
