import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/models/offer';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css', '../../styles/admin-style.css']
})
export class NewOfferComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();

  constructor(
    private offerService: OffersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  createOffer(offer: Offer) {
    this.sub.add(
      this.offerService.createNewOffer(offer).subscribe({
        next: (res) => {
          if(res.ok){
            this.toastr.success('Oferta creada correctamente');
            this.router.navigate(['/admin/offers'])
          }
        },
        error: (err) => {
          this.toastr.error(err.error.error);
        }
      })
    )
  }
}
