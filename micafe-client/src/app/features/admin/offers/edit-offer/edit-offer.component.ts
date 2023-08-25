import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from 'src/app/shared/models/offer';
import { ProductsService } from '../../services/products.service';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  constructor(
    private productService: ProductsService,
    private swal: SwalService,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {}

  editOffer(offer: Offer) {
    this.swal.showConfirmation('Estás a punto de guardar los cambios en este producto. ¿Deseas continuar?')
    .then((res) => {
      if(res.isConfirmed){
        this.sub.add(
          
        )
      }
    })
  }
}
