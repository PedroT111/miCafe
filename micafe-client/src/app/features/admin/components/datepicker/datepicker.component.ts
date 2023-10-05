import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css', '../../styles/admin-style.css']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Output() dateSelection = new EventEmitter<{
    startSale: Date;
    endSale: Date;
  }>();
  @Input() startDateForEdit: Date;
  @Input() endDateForEdit: Date;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  minDate: NgbDate;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.minDate = calendar.getToday();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startDateForEdit']) {
      this.fromDate = this.convertDateToNgbDate(this.startDateForEdit);
    }
    if (changes['endDateForEdit']) {
      this.toDate = this.convertDateToNgbDate(this.endDateForEdit);
    }
  }

  private convertDateToNgbDate(date: Date): NgbDate | null {
    if (date) {
      return new NgbDate(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
    }
    return null;
  }

  ngOnInit(): void {}

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate) {
      if (date.equals(this.fromDate)) {
        this.toDate = date;
        const startSale = new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day,
        );
        const endSale = new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        );
        this.dateSelection.emit({ startSale, endSale });
      } else if (date.after(this.fromDate)) {
        this.toDate = date;
        const startSale = new Date(
          this.fromDate.year,
          this.fromDate.month - 1,
          this.fromDate.day
        );
        const endSale = new Date(
          this.toDate.year,
          this.toDate.month - 1,
          this.toDate.day
        );
        this.dateSelection.emit({ startSale, endSale });
      } else {
        this.toDate = null;
        this.fromDate = date;
      }
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
