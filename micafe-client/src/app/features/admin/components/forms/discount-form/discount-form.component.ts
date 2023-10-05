/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../../../services/discount.service';
import { DiscountForm } from 'src/app/shared/models/discount';
import { Subscription } from 'rxjs';
import { SwalService } from 'src/app/shared/utils/swal.service';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: [
    './discount-form.component.css',
    '../../../styles/admin-style.css'
  ]
})
export class DiscountFormComponent implements OnInit {
  @Output() onSend = new EventEmitter<{
    discountData: DiscountForm;
    segmentClient: string | null;
  }>();
  btnPercentageSelected: boolean;
  btnFixedSelected: boolean = false;
  allClientesSelected: boolean;
  segmentClients: string;
  minDate: NgbDate;
  form: FormGroup;
  filtersForm: FormGroup;
  sub: Subscription = new Subscription();
  constructor(
    private calendar: NgbCalendar,
    private fb: FormBuilder,
    private discountService: DiscountService,
    private swal: SwalService
  ) {
    this.minDate = this.calendar.getToday();
    this.form = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      discountType: ['fixedAmount'],
      value: ['', Validators.required],
      expirationDate: ['', Validators.required],
      filters: this.fb.group({
        numberDaysLastOrder: [],
        periodTime: [],
        limit: []
      })
    });
  }

  ngOnInit(): void {
    this.btnPercentageSelected = true;
    this.form.valueChanges.subscribe((discount) => {
      this.discountService.sendDiscount(discount);
    });
  }

  onSelectFixedAmount() {
    this.form.get('discountType')?.setValue('fixedAmount');
  }

  onSelectPercentage() {
    this.form.get('discountType')?.setValue('percentage');
  }

  onAllClientsSelected(all: boolean) {
    this.allClientesSelected = all;
  }

  onSegmentSelected(segment: string) {
    this.segmentClients = segment;
  }
  generateCode() {
    const long = 8;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generatedCode = Array.from({ length: long }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    this.form.get('code')?.setValue(generatedCode);
  }

  onSubmit() {
    if (this.form.valid) {
      this.swal.showConfirmation(
        'Estás a punto de crear un descuento'
      ).then((res) => {
        if(res.isConfirmed){
          const discountData = this.form.value;
          const segmentClient = this.segmentClients;
    
          // Emitir el evento con las propiedades correctas
          this.onSend.emit({ discountData: discountData, segmentClient: segmentClient });
        }
      })
    }
  }
}
