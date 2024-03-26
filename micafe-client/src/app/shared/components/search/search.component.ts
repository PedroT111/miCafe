import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchTextChanged = new EventEmitter<string>();
  @Input() searchTerm: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onSearchTextChange(){
    this.searchTextChanged.emit(this.searchTerm);
  }

}
