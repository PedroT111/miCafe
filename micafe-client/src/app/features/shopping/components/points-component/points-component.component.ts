import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-points-component',
  templateUrl: './points-component.component.html',
  styleUrls: ['./points-component.component.css']
})
export class PointsComponentComponent implements OnInit {
  @Input() points: number = 0;
  @Input() orderPoints: number;
  @Input() isAvailable: boolean;
  @Output() onPaidWithPoints = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  onCheckBoxSelected(event: Event){
    const chk = event.target as HTMLInputElement;
    this.onPaidWithPoints.emit(chk.checked);
  }

}
