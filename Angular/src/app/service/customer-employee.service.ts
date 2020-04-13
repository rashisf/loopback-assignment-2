import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../model/employee-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerEmployeeService {

  constructor(private http: HttpClient) { }

  getCustomerEmployee(id): Observable<EmployeeModel[]>
  {
    return this.http.get<EmployeeModel[]>(`http://localhost:3000/customers/${id}/employees`);
  }

}
