import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AdjustemPrice } from 'src/app/shared/models/adjustemPrice';
import { ApiResponse } from 'src/app/shared/models/postResponse';
import {
  Product,
  ListProductApiResponse,
  ProductApiResponse
} from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<ListProductApiResponse>('/product').pipe(
      map((res: ListProductApiResponse) => {
        return res.products;
      })
    );
  }
  getOneProduct(id: string): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(`/product/${id}`);
  }
  createProduct(p: Product): Observable<ProductApiResponse> {
    return this.http.post<ProductApiResponse>('/product/new', p);
  }
  editProduct(p: Product): Observable<ProductApiResponse> {
    return this.http.put<ProductApiResponse>(`/product/${p._id}`, p);
  }
  deleteProduct(id: string): Observable<ProductApiResponse> {
    return this.http.delete<ProductApiResponse>(`/product/${id}`);
  }

  getProductsOnSale(): Observable<ListProductApiResponse> {
    return this.http.get<ListProductApiResponse>('/product/onsale').pipe(
      map((res: ListProductApiResponse) => {
        const offers = res.products.map((offer) => ({
          ...offer,
        }));
        return { ...res, products: offers };
      })
    );
  }

  getProductsNoSale(): Observable<ListProductApiResponse> {
    return this.http.get<ListProductApiResponse>('/product/no-sale');
  }

  adjustemPrice(adjustem: AdjustemPrice):Observable<ApiResponse>{
    return this.http.post<ApiResponse>('/product/update-prices', adjustem);
  }
}
