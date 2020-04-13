import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerModel } from '../model/customer-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _url: string = "http://localhost:3000/customers";
 
  constructor(private http: HttpClient) { }

 
  getCustomer(): Observable<CustomerModel[]> {
    return this.http.get<CustomerModel[]>(this._url);
  }
  getCustomerById(id): Observable<CustomerModel>
  {
    console.log(this._url+ '/' + id)
    return this.http.get<CustomerModel>(this._url+ '/' + id);
  }

  createCustomer(Customer: CustomerModel) {
    return this.http.post<any>(this._url, Customer);
  }

  deleteCustomer(id: number) {
    return this.http.delete<any>(this._url + '/' + id);
  }

  updateCustomer(id, Customer: CustomerModel) {
    return this.http.put<any>(this._url + '/' + id, Customer);
  }
}
