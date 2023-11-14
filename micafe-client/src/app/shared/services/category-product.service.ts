/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { CategoryApiResponse, CategoryProduct, ListCategoryResponse, ListCategorySummary } from 'src/app/shared/models/categoryProduct';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {

  constructor(private http: HttpClient) { }

  getAllCategories():Observable<ListCategoryResponse>{
    return this.http.get<ListCategoryResponse>('/category-product/categories');
  }

  getCategoriesWithProducts():Observable<ListCategorySummary>{
    return this.http.get<ListCategorySummary>('/category-product/categories/products');
  }

  getCategory(id: any): Observable<CategoryApiResponse>{
    return this.http.get<CategoryApiResponse>(`/category-product/${id}`);
  }

  createCategory(category: CategoryProduct):Observable<CategoryApiResponse>{
    return this.http.post<CategoryApiResponse>('/category-product/new', category);
  }

  updateCategory(category: CategoryProduct):Observable<CategoryApiResponse>{
    return this.http.put<CategoryApiResponse>(`/category-product/${category._id}`, category);
  }

  deleteCategoy(category: CategoryProduct):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`/category-product/delete/${category._id}`);
  }
}
