/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Offer,
  OfferApiResponse,
  OfferCategory,
  OfferProduct,
  OffersList
} from 'src/app/shared/models/offer';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private http: HttpClient) {}

  createNewOffer(offer: Offer): Observable<OfferApiResponse> {
    return this.http.post<OfferApiResponse>('/offer/new', offer);
  }

  createOfferByCategory(offer: OfferCategory):Observable<OfferCategory>{
    return this.http.post<OfferCategory>('/offer/category', offer);
  }

  getOffer(id: any):Observable<OfferApiResponse>{
    return this.http.get<OfferApiResponse>(`/offer/${id}`);
  }

  getOffers(): Observable<OfferProduct[]> {
    return this.http.get<OffersList>('/offer').pipe(
      map((res: OffersList) => {
        const offers = res.offers;
        if(offers === undefined || offers.length === 0){
          return [];
        }
        return offers.map((offer) =>{
          const isPercentage = offer.isPercentage;
          const salePrice = isPercentage ? (offer.productId.price * (100 - offer.value)/100) : offer.value;
          const percentage = (1 - (salePrice / offer.productId.price))*100;
          return {
            _id: offer._id,
            productName: offer.productId.name,
            price: offer.productId.price,
            salePrice: salePrice,
            percentage: `${percentage.toFixed()}%`,
            startSale: new Date(offer.startSale).toLocaleString(),
            endSale: new Date(offer.endSale).toLocaleString(),
            status: offer.status
          }
        })
      })
    );
  }

  updateOffer(offer: Offer):Observable<OfferApiResponse>{
    return this.http.put<OfferApiResponse>(`/offer/${offer._id}`, offer);
  }

  deleteOffer(o: OfferProduct):Observable<OfferProduct>{
    return this.http.delete<OfferProduct>(`/offer/${o._id}`);
  }
}
