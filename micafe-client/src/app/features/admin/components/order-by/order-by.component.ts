/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortBy } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-order-by',
  templateUrl: './order-by.component.html',
  styleUrls: ['./order-by.component.css']
})
export class OrderByComponent implements OnInit {
  @Input() sorting: SortBy[] = [];
  @Output() onSortBySelected = new EventEmitter<SortBy>();
  @Input() selectedOption: SortBy | null;
  constructor() { }

  ngOnInit(): void {
  }

  onSort(sort: SortBy){
    this.selectedOption = sort;
    this.onSortBySelected.emit(sort);
  }

}
