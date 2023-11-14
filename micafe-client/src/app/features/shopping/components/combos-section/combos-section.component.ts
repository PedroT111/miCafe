import { Component, Input, OnInit } from '@angular/core';
import { ComboSummary } from 'src/app/shared/models/combo';

@Component({
  selector: 'app-combos-section',
  templateUrl: './combos-section.component.html',
  styleUrls: ['./combos-section.component.css']
})
export class CombosSectionComponent implements OnInit {
  @Input()combos: ComboSummary[];
  constructor() { }

  ngOnInit(): void {
  }

}
