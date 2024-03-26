import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  NgbActiveModal,
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import { isToday } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  @Output() onSelectDateTime = new EventEmitter();
  @Input() orderDate: Date;
  @Input() orderId: string;
  date: NgbDateStruct;
  minDate: NgbDate;
  minTime: NgbTimeStruct;
  time: NgbTimeStruct;
  pickUpDateTime: Date;
  invalidTime: boolean = false;
  constructor(
    private modalService: NgbActiveModal,
    private calendar: NgbCalendar,
    private orderService: OrdersService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.minDate = this.calendar.getToday();
    if (this.orderDate) {
      const date = new Date(this.orderDate);
      this.date = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      };
      this.time = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      };
    }
  }

  calculateMinDate() {
    const date = new Date(this.date.year, this.date.month - 1, this.date.day);
    if (isToday(date)) {
      const today = new Date();
      const minHour = today.getHours();
      const minMinute = today.getMinutes() + 5;

      this.minTime = {
        hour: minHour,
        minute: minMinute,
        second: 0
      };
      return;
    }
    this.minTime = { hour: 0, minute: 0, second: 0 };
  }

  isValidTime() {
    this.calculateMinDate();
    const date = new Date(this.date.year, this.date.month - 1, this.date.day);
    console.log(date);

    if (isToday(date)) {
      return (
        this.time.hour < this.minTime.hour ||
        (this.time.hour === this.minTime.hour &&
          this.time.minute < this.minTime.minute)
      );
    } else {
      return false;
    }
  }

  setDateTime() {
    if (this.isValidTime()) {
      this.invalidTime = true;
      return;
    }
    const { year, month, day } = this.date;
    const { hour, minute } = this.time;

    this.pickUpDateTime = new Date(year, month - 1, day, hour, minute);

    this.sub.add(
      this.orderService
        .changePickUpTime(this.orderId, this.pickUpDateTime)
        .subscribe({
          next: (res) => {
            this.toastr.success(res.msg);
            this.modalService.close(res.msg);
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
    );
  }
}
