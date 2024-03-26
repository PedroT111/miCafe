/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() filterOptions: any[];
  @Input() selectedFilter: any;
  @Input() title: string;
  @Output() filterSelected = new EventEmitter<any>(); 
  constructor() { }

  ngOnInit(): void {
  }

  onFilterSelected(filterOption: any){
    this.filterSelected.emit(filterOption);
  }

}
