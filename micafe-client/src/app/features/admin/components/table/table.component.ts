/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component,EventEmitter,Input, OnInit, Output,} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})
export class TableComponent implements OnInit{
  private _data: any[];
  @Input() headers: any[];
  @Output() seeMore = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Input() pageSize: number;
  page: number = 1;
  totalItems: number = 0;

  @Input()
  set data(value: any[]) {
    if(value){
      this._data = value;
    this.totalItems = value.length;
    this.page = 1;
    }
  }

  get data(): any[] {
    return this._data;
  }
  constructor() { 
  }
  

  ngOnInit(): void {
    this.data = [];
  }

  getProperty(item:any, name: string):string{
    const value = item[name];
    return value && typeof value === 'object' ? value.name : value
  }

  onSeeMore(item:any){
    this.seeMore.emit(item);
  }

  onDelete(item:any){
    this.delete.emit(item);
  }
  

}
