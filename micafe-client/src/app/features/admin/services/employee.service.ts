import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import {
  Employee,
  EmployeeForm,
  EmployeeList,
  EmployeeResponse
} from 'src/app/shared/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeeList>('/user/employee').pipe(
      map((res) => {
        return res.users;
      })
    );
  }

  getEmployee(id: string): Observable<EmployeeForm> {
    return this.http.get<EmployeeResponse>(`/employee/${id}`).pipe(
      map((res) => {
        const employee = {
          id: res.employee._id,
          name: res.employee.name,
          lastName: res.employee.lastName,
          email: res.employee.email,
          password: ''
        };
        return employee;
      })
    );
  }

  createNewEmployee(employee: EmployeeForm): Observable<EmployeeResponse> {
    return this.http.post<EmployeeResponse>('/employee/new', employee);
  }

  updateEmployee(employee: EmployeeForm): Observable<EmployeeResponse> {
    const data = {       
      name: employee.name,
      lastName: employee.lastName,
      email: employee.email
    }
    return this.http.put<EmployeeResponse>(
      `/employee/${employee.id}`,
      data
    );
  }

  deleteEmployee(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`/employee/${id}`);
  }
}
