/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct, NgbModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

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
  pickUpDateTime: Date;
  constructor(private modalService: NgbModal, private calendar: NgbCalendar) {}

  ngOnInit(): void {
    this.minDate = this.calendar.getToday();
  }
  
  open(content: any) {
		this.modalService.open(content,{ centered: true });
	}

  setDateTime(){
    const {year, month, day} =  this.date;
    const {hour, minute} = this.time;
    
    this.pickUpDateTime = new Date(year, month -1, day, hour, minute);

    this.onSelectDateTime.emit(this.pickUpDateTime);
  }

}
