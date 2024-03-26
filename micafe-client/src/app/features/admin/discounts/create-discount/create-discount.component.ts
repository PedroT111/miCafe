/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DiscountForm } from 'src/app/shared/models/discount';
import { DiscountService } from '../../../../shared/services/discount.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css', '../../styles/admin-style.css']
})
export class CreateDiscountComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(private discountService: DiscountService, private router: Router, private toastr: ToastrService) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
  }

  onSubmit({ discountData, segmentClient }: { discountData: DiscountForm, segmentClient: string | null }) {
   if(segmentClient === null){
    //llamada api all clients
   }
   else{
    if(segmentClient === 'inactive'){
      this.sub.add(
        this.discountService.createDiscountForInactiveClients(discountData).subscribe({
          next: (res) => {
            this.toastr.success(res.msg);
            this.router.navigate(['/admin/discounts']);
          },
          error: (err) => {
            console.log(err)
            this.toastr.error(err.error.error);
          }
        })
      )
    } else if( segmentClient === 'top'){
      this.sub.add(
        this.discountService.createDiscountForTopClientes(discountData).subscribe({
          next: (res) => {
            this.toastr.success(res.msg);
            this.router.navigate(['/admin/discounts']);
          },
          error: (err) => {
            this.toastr.error(err.error.error);
          }
        })
      )
    }
   }
  }

}
