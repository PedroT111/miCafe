/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbModal,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-pickup-time',
  templateUrl: './pickup-time.component.html',
  styleUrls: ['./pickup-time.component.css']
})
export class PickupTimeComponent implements OnInit {
  @Output() onSelectDateTime = new EventEmitter<Date>();
  date: NgbDateStruct;
  minDate: NgbDate;
  time: NgbTimeStruct;
  minTime: NgbTimeStruct;
  pickUpDateTime: Date;
  invalidTime: boolean;
  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar
  ) {
    const now = new Date();
    this.date = this.calendar.getToday();
    this.time = {
      hour: now.getHours() + 1,
      minute: now.getMinutes(),
      second: 0
    };
  }

  ngOnInit(): void {
    this.invalidTime = false;
    this.minDate = this.calendar.getToday();
  }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  calculateMinDate() {
    const date = new Date(this.date.year, this.date.month - 1, this.date.day);
    if (isToday(date)) {
      const today = new Date();
      const minHour = today.getHours();
      const minMinute = today.getMinutes() + 10;

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
    if (!this.isValidTime()) {
      const { year, month, day } = this.date;
      const { hour, minute } = this.time;

      this.pickUpDateTime = new Date(year, month - 1, day, hour, minute);

      this.onSelectDateTime.emit(this.pickUpDateTime);
      this.invalidTime = false;
      this.modalService.dismissAll();
      return;
    }
    this.invalidTime = true;
  }
}
