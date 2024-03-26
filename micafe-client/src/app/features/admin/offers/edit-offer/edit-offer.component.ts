import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { ToastrService } from 'ngx-toastr';
import { OffersService } from '../../services/offers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css', '../../styles/admin-style.css']
})
export class EditOfferComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private offerService: OffersService,
    private swal: SwalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  editOffer(offer: Offer) {
    this.swal.showConfirmation('You are about to save changes to this offer. Do you want to continue?')
    .then((res) => {
      if(res.isConfirmed){
        this.sub.add(
          this.offerService.updateOffer(offer).subscribe({
            next: () => {
              this.toastr.success('Offer updated successfully');
              this.router.navigate(['/admin/offers']);
              
            },
            error: (err) => {
              this.toastr.error(err.error.error);
            }
          })
        )
      }
    })
  }
}
