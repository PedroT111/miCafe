/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OFFERS } from '../../constants/offers';
import { ToastrService } from 'ngx-toastr';
import { SwalService } from 'src/app/shared/utils/swal.service';
import { Router } from '@angular/router';
import { Offer, OfferProduct } from 'src/app/shared/models/offer';
import { OffersService } from '../../services/offers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OfferCategoryFormComponent } from '../../components/forms/offer-category-form/offer-category-form.component';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.css', '../../styles/admin-style.css']
})
export class OffersListComponent implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  offerProducts: OfferProduct[];
  filteredOffers: OfferProduct[];
  selectedStatusFilter: any;
  filterStartDate: Date;
  filterEndDate:Date;
  options = [{_id: 'active', name: 'Activo'}, {_id: 'scheduled', name: 'Programado'}];
  searchTerm: string;
  tableHeader = OFFERS.OFFERS_TABLE_HEADERS;

  constructor(
    private offerService: OffersService,
    private toastr: ToastrService,
    private swal: SwalService,
    private router: Router,
    private modalService: NgbModal
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
    if (this.selectedStatusFilter) {
      this.filteredOffers= this.filteredOffers.filter(
        (item) => item.status === this.selectedStatusFilter
      );
    }
    if(this.filterStartDate && this.filterEndDate){
      this.filteredOffers = this.filteredOffers.filter(
        (item) => new Date(item.endSale) >= this.filterStartDate && new Date(item.startSale) <= this.filterEndDate
      )
    }
  }

  onSearchTextChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onFilterSelected(status: any){
    this.selectedStatusFilter = status;
    this.applyFilters();
  }

  onDateFilterSelected(dates: { startSale: Date; endSale: Date }){
    console.log(this.filteredOffers)
    this.filterStartDate = dates.startSale;
    this.filterEndDate = dates.endSale;
    console.log(this.filterEndDate, this.filterStartDate)
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
              next: () => {
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

  addOfferByCategory(){
    const modalRef = this.modalService.open(OfferCategoryFormComponent, {
      centered: true
    });

    modalRef.result.then(
      (result) => {
        this.toastr.info(result);
        this.getOfferProducts();
      }
    ) 


  }

  editOffer(o: Offer){
    this.router.navigate([`/admin/offers/edit/${o._id}`])
  }
}
