import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListCategoryResponse } from 'src/app/shared/models/categoryProduct';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<ListCategoryResponse>{
    return this.http.get<ListCategoryResponse>('/category-product/categories');
  }
}
