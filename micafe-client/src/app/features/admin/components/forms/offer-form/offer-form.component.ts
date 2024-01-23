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
import { ToastrService } from 'ngx-toastr';
import { Offer } from 'src/app/shared/models/offer';
import { ActivatedRoute } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import { OffersService } from '../../../services/offers.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { LABEL_BUTTONS } from 'src/app/shared/constants';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.css', '../../../styles/admin-style.css']
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
  today: NgbDate;
  buttons = LABEL_BUTTONS;
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private offerService: OffersService,
    private toastr: ToastrService,
    private actRoute: ActivatedRoute,
    private calendar: NgbCalendar
  ) {
    this.form = this.fb.group({
      _id: [],
      productId: ['', Validators.required],
      isPercentage: [false],
      value: ['', Validators.required],
      startSale: ['', Validators.required],
      endSale: ['', Validators.required]
    });
    this.today = calendar.getToday();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this._id = this.actRoute.snapshot.params['id'];
    this.getProducts();
    if (this._id) {
      this.editMode = true;
      this.offerService.getOffer(this._id).subscribe({
        next: (res) => {
          const offer = res.offer;
          const productId = offer.productId._id;
          this.form.patchValue({
            _id: this._id,
            productId,
            isPercentage: offer.isPercentage,
            value: offer.value,
            startSale: offer.startSale,
            endSale: offer.endSale
          });
          this.valorActual = offer.productId.price;
          this.startDate = new Date(this.form.get('startSale')?.value);
          this.endDate = new Date(this.form.get('endSale')?.value);
          this.startTime = {
            hour: this.startDate.getHours(),
            minute: this.startDate.getMinutes(),
            second: 0
          };
          this.endTime = {
            hour: this.endDate.getHours(),
            minute: this.endDate.getMinutes(),
            second: 0
          };
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      });
    }

    this.form.get('productId')?.valueChanges.subscribe((x) => {
      const product = this.products.find((p) => p._id === x);
      if (product) {
        this.valorActual = product.price;
      }
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.startDate, this.endDate, this.startTime, this.endTime);
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
          this.products = res.products;
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
