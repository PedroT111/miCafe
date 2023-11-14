import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryProductService } from '../../../../../shared/services/category-product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CategoryProduct } from 'src/app/shared/models/categoryProduct';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { OffersService } from '../../../services/offers.service';

@Component({
  selector: 'app-offer-category-form',
  templateUrl: './offer-category-form.component.html',
  styleUrls: ['./offer-category-form.component.css', '../../../styles/admin-style.css']
})
export class OfferCategoryFormComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  form: FormGroup;
  categories: CategoryProduct[];
  startDate: Date;
  endDate: Date;
  startTime: NgbTimeStruct;
  endTime: NgbTimeStruct;
  validateDate: boolean = false;
  constructor(
    private categoryService: CategoryProductService,
    private offerService: OffersService,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private swal: SwalService
  ) {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
      value: ['', Validators.required],
      startSale: ['', Validators.required],
      endSale: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.sub.add(
      this.categoryService.getAllCategories().subscribe({
        next: (res) => {
          this.categories = res.categories;
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    );
  }

  onSubmit() {
    if(!this.startDate || !this.endDate || !this.startTime || !this.endTime){
      this.validateDate = true;
      return;
    }
    this.form.markAllAsTouched();
    this.formatDates();
    if (this.form.valid) {
      this.swal.showConfirmation(
        'Estás a punto de crear una oferta para todos los productos de la categoría, en caso de que un producto ya tenga una oferta registrada la misma será eliminada'
      ).then(res => {
        if(res.isConfirmed){
          this.sub.add(
            this.offerService.createOfferByCategory(this.form.value).subscribe({
              next: () => {
                this.activeModal.close('Oferta creada correctamente!');
              },
              error: (err) => {
                this.toastr.error(err.error.error);
              }
            })
          )
        }
      });
    }
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

  onCancel() {
    this.activeModal.dismiss();
  }
}
