import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { Discount } from 'src/app/shared/models/discount';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-validate-discount',
  templateUrl: './validate-discount.component.html',
  styleUrls: ['./validate-discount.component.css']
})
export class ValidateDiscountComponent implements OnInit, OnDestroy, OnChanges {
  sub: Subscription = new Subscription();
  customerId: string | undefined;
  @Input() enabled: boolean;
  @Output() onValidate = new EventEmitter<Discount>();
  code: string;
  invalidCode: boolean = false;
  constructor(
    private discountService: DiscountService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enabled']){
      if(this.enabled){
        this.code = '';
      }
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.customerId = this.authService.getUserData()?._id;
  }

  validate() {
    if (this.customerId && this.code) {
      this.sub.add(
        this.discountService
          .validateDiscount(this.code, this.customerId)
          .subscribe({
            next: (res) => {
              if (res.ok) {
                this.onValidate.emit(res.discount);
              }
            },
            error: (err) => {
              console.log(err);
              this.toastr.error(err.error.error)
            }
          })
      );
    }
  }
}
