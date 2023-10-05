/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { format } from 'date-fns';

@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css']
})
export class CardOrderComponent implements OnInit {
  @Input() order: Order;
  @Output() onConfirm = new EventEmitter<Order>();
  fecha: string;
  hora: string;
  timeLeft: string;
  isLessThanHour: boolean = false;
  private intervalId: any;
  public isCollapsed = true;

  constructor() {}

  ngOnInit(): void {
    this.formatearFecha(this.order.pickUpDateTime);
    //this.updateCounter();
  }

  formatearFecha(fecha: Date) {
    const fechaObj = new Date(fecha);
    const hora = format(fechaObj, 'HH:mm');
    this.fecha = format(fechaObj, 'dd/MM');
    this.hora = hora.toString();
  }

  pickUpOrder(order: Order) {
    this.onConfirm.emit(order);
  }

  /*updateCounter(){
    this.updateTimeLeft();

    this.intervalId = setInterval(() => {
      this.updateTimeLeft();
    }, 60000)
  }

  updateTimeLeft() {
    const now = new Date();
    const timeLeft = new Date(this.order.pickUpDateTime).getTime() - now.getTime();

    const leftMinutes = Math.floor(timeLeft / 60000);

    if (leftMinutes > 1440) {
      const days = Math.floor(leftMinutes / 1440); //1d === 1440m
      const hours = Math.floor((leftMinutes % 1440) / 60);

      this.timeLeft = `${days}d ${hours}h`;
    } else if (leftMinutes > 60 && leftMinutes < 1400) {
      const hours = Math.floor(leftMinutes / 60);
      const minutes = Math.floor(leftMinutes % 60);

      this.timeLeft = `${hours}h ${minutes}m`;
    } else {
      this.isLessThanHour = true;
      this.timeLeft = `${leftMinutes}m`;
    }
  }*/
}
