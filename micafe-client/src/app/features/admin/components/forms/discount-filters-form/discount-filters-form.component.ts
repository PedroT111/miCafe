import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discount-filters-form',
  templateUrl: './discount-filters-form.component.html',
  styleUrls: ['./discount-filters-form.component.css']
})
export class DiscountFiltersFormComponent implements OnInit {
   allClientsSelected: boolean;
   segmentClientsSelected: boolean;
   inactiveClientsSelected: boolean;
   topClientsSelected: boolean;
   @Output() onAllClientsSelected = new EventEmitter<boolean>();
   @Output() onSegmentSelected = new EventEmitter<string>();
   filtersForm: FormGroup;

  constructor(public controlContainer: ControlContainer, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allClientsSelected = true;
    this.filtersForm = this.controlContainer.control as FormGroup;
  }

  onRadioChange(option: string) { 
    this.allClientsSelected = option === 'all';
    this.segmentClientsSelected = option !== 'all';

    this.onAllClientsSelected.emit(option === 'all');
  }

  onRadioSegmentClientsChange(option: string) {
    this.inactiveClientsSelected = option === 'inactive';
    this.topClientsSelected = option !== 'inactive';

    this.onSegmentSelected.emit(option);
  }



}
