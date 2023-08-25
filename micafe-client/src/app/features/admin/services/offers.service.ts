import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  Offer,
  OfferApiResponse,
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

  getOffers(): Observable<OfferProduct[]> {
    return this.http.get<OffersList>('/offer').pipe(
      map((res: OffersList) => {
        console.log('res', res)
        const offers = res.offers;
        if(offers === undefined || offers.length === 0){
          return [];
        }
        return offers.map((offer) =>{
          return {
            _id: offer._id,
            productName: offer.productId.name,
            price: offer.productId.price,
            salePrice: offer.productId.salePrice,
            startSale: new Date(offer.startSale).toLocaleString(),
            endSale: new Date(offer.endSale).toLocaleString(),
            status: offer.status
          }
        })
      })
    );
  }

  deleteOffer(o: OfferProduct):Observable<OfferProduct>{
    return this.http.delete<OfferProduct>(`/offer/product/${o._id}`);
  }
}
