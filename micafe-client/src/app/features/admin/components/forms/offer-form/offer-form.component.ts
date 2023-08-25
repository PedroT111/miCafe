/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from '../../../services/products.service';
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/shared/models/offer';
import { ActivatedRoute } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css']
})
export class OfferFormComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  form: FormGroup;
  @Output() onSend = new EventEmitter<Offer>();
  products: Product[] = [];
  valorActual: number;
  startDate: Date;
  endDate: Date;
  startTime: NgbTimeStruct;
  endTime: NgbTimeStruct;
  validateDate: boolean = false;
  _id: string;
  editMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      productId: ['', Validators.required],
      isPercentage: [false],
      value: ['', Validators.required],
      startSale: ['', Validators.required],
      endSale: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this._id = this.actRoute.snapshot.params['id'];
    this.getProducts();
    if (this._id) {
      this.editMode = true;
      this.productService.getOneProduct(this._id).subscribe({
        next: (res) => {
          this.form.patchValue(res.product);
          this.valorActual = res.product.price;
          this.startDate = new Date(this.form.get('startSale')?.value);
          this.endDate = new Date(this.form.get('endSale')?.value);
          this.startTime = {hour: this.startDate.getHours(), minute: this.startDate.getMinutes(), second: 0};
          this.endTime = {hour: this.endDate.getHours(), minute: this.endDate.getMinutes(), second: 0};
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      });
    } 

    this.form.get('productId')?.valueChanges.subscribe((x) => {
      const product = this.products.find((p) => p._id === x);
      console.log('desde llamada al form')
      if (product) {
        this.valorActual = product.price;
      }
    });

  
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.startDate, this.endDate, this.startTime, this.endTime)
    if (!this.startTime || !this.endTime || !this.startDate || !this.endDate) {
      this.validateDate = true;
      return;
    }
    this.formatDates();
    if (this.form.valid) {
      this.onSend.emit(this.form.value);
    }
  }

  getProducts() {
    const productsObservable: Observable<any> = this._id
      ? this.productService.getAllProducts()
      : this.productService.getProductsNoSale();

    this.sub.add(
      productsObservable.subscribe({
        next: (res) => {
          this.products = this._id ? res : res.products;
          console.log('service products')
          
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  onTimeSelection(time: NgbTimeStruct, which: string) {
    if (which === 'end') {
      this.endTime = time;
      return;
    }
    this.startTime = time;
  }

  formatDates() {
    const setTime = (date: Date, time: NgbTimeStruct) => {
      date.setHours(time.hour);
      date.setMinutes(time.minute);
    };

    setTime(this.startDate, this.startTime);
    setTime(this.endDate, this.endTime);

    this.form.get('startSale')?.patchValue(this.startDate);
    this.form.get('endSale')?.patchValue(this.endDate);
  }
  handleDateSelection(dates: { startSale: Date; endSale: Date }) {
    this.startDate = dates.startSale;
    this.endDate = dates.endSale;
  }
}