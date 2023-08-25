/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OFFERS } from '../../constants/offers';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { Router } from '@angular/router';
import { Offer, OfferProduct } from 'src/app/shared/models/offer';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css']
})
export class OffersListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  offerProducts: OfferProduct[];
  filteredOffers: OfferProduct[];
  selectedFilter: any;
  options = [{_id: 'active', name: 'Activo'}, {_id: 'scheduled', name: 'Programado'}];
  searchTerm: string;
  tableHeader = OFFERS.OFFERS_TABLE_HEADERS;

  constructor(
    private offerService: OffersService,
    private toastr: ToastrService,
    private swal: SwalService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.getOfferProducts();
  }

  getOfferProducts() {
    this.sub.add(
      this.offerService.getOffers().subscribe({
        next: (res) => {
          this.offerProducts = res;
          this.filteredOffers = this.offerProducts;
        },
        error: (err) => {
          console.log(err)
        }
      })
    );
  }

  applyFilters() {
    this.filteredOffers = this.offerProducts;
    if (this.searchTerm) {
      this.filteredOffers = this.filteredOffers.filter((item) =>
        item.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedFilter) {
      console.log(this.selectedFilter, 's')
      this.filteredOffers= this.filteredOffers.filter(
        (item) => item.status === this.selectedFilter
      );
    }
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onFilterSelected(status: any){
    console.log(status)
    this.selectedFilter = status;
    console.log(this.selectedFilter, 'selected filter')
    this.applyFilters();
  }

  deleteOffer(o: OfferProduct) {
    this.swal
      .showConfirmation(
        'Estás a punto de eliminar esta oferta de forma permanente. ¿Deseas continuar?'
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.sub.add(
            this.offerService.deleteOffer(o).subscribe({
              next: (res) => {
                this.toastr.success('Oferta eliminada correctamente');
                this.getOfferProducts();
              },
              error: (err) => {
                this.toastr.error(err);
              }
            })
          );
        }
      });
  }

  addOffer(){
    this.router.navigate(['/admin/offers/new']);
  }

  editOffer(o: Offer){
    
  }
}
