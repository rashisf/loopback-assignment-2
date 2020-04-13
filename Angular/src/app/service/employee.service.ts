import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../model/employee-model';
import { RoleModel } from '../model/role-model';
import { CustomerModel } from '../model/customer-model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private _url: string = "http://localhost:3000/employees";
  private _roleUrl: string = "http://localhost:3000/roles";
  private _customerUrl: string = "http://localhost:3000/customers";

  constructor(private http: HttpClient) { }


  getEmployee(): Observable<EmployeeModel[]> {
    return this.http.get<any>(this._url)

  }

  getEmployeeById(id): Observable<EmployeeModel> {
    return this.http.get<any>(this._url + '/' + id)
  }
  getRole(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(this._roleUrl);
  }

  getCustomer(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this._customerUrl);
  }

  createEmployee(employee: EmployeeModel) {
    return this.http.post<any>(this._url, employee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(this._url + '/' + id);
  }

  updateEmployee(id, employee: EmployeeModel) {
    return this.http.put<any>(this._url + '/' + id, employee);
  }
}
