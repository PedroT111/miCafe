import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit, OnChanges {
  @Input() date: Date | null;
  time: NgbTimeStruct;
  @Output() selectedTime = new EventEmitter<NgbTimeStruct>();
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date'] && changes['date'].currentValue) {
      console.log(this.date);
      const hours = this.date?.getHours();
      const minutes = this.date?.getMinutes();
      console.log('hola')
      if (hours !== undefined && minutes !== undefined) {
        this.time = { hour: hours, minute: minutes, second: 0 };
      }
    }
  }

  ngOnInit(): void {}

  onTimeSelection() {
    this.selectedTime.emit(this.time);
  }
}
