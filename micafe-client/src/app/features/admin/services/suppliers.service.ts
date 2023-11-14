import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier, SupplierList, SupplierResponse } from 'src/app/shared/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  createSupplier(supplier: Supplier):Observable<SupplierResponse>{
    return this.http.post<SupplierResponse>('/supplier/new', supplier);
  }

  getAll():Observable<SupplierList>{
    return this.http.get<SupplierList>('/supplier');
  }

  getOne(id: string):Observable<SupplierResponse>{
    return this.http.get<SupplierResponse>(`/supplier/${id}`);
  }

  update(supplier: Supplier):Observable<SupplierResponse>{
    return this.http.put<SupplierResponse>(`/supplier/update(${supplier._id}`, supplier);
  }

  delete(id: string):Observable<SupplierResponse>{
    return this.http.delete<SupplierResponse>(`/supplier/delete/${id}`);
  }
}
