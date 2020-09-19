import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseURL = 'http://localhost:5000/api/customer';

  constructor(private http: HttpClient) { }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/${id}`);
  }

  getCustomerByName(name: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}/search/${name}`);
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}/list`);
  }

  createCustomer(customer: Customer): boolean {
    let success: boolean;
    
    this.http.post(`${this.baseURL}`, customer)
      .subscribe(
        data => {
          if (data) {
            success = true;
          } else {
            success = false;
          }
        },
        error => {
          console.log(error);
          success = false;
        }
      );

    return success;
  }
}
