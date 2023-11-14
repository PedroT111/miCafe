import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { Combo, ComboApiResponse,ComboSummary, ListCombosApiResponse } from 'src/app/shared/models/combo';

@Injectable({
  providedIn: 'root'
})
export class CombosService {
  constructor(private http: HttpClient) {}

  getAllCombos(): Observable<ComboSummary[]> {
    return this.http.get<ListCombosApiResponse>('/combo').pipe(
      map((res) => {
        const combos = res.combos.map((combo) => {
          return {
            ...combo,
            isActive: combo.isActive ? 'Activo' : 'Inactivo'
          }
        });
        return combos
      })
    );
  }

  getCombo(id: string):Observable<ComboApiResponse>{
    return this.http.get<ComboApiResponse>(`/combo/${id}`);
  }

  newCombo(c: Combo): Observable<ComboApiResponse>{
    return this.http.post<ComboApiResponse>('/combo/new', c)
  }

  deleteCombo(c: Combo):Observable<ApiResponse>{
    return this.http.delete<ApiResponse>(`/combo/${c._id}`);
  }
  
  updateCombo(c: Combo):Observable<ComboApiResponse> {
    return this.http.put<ComboApiResponse>(`/combo/${c._id}`, c);
  }
}
