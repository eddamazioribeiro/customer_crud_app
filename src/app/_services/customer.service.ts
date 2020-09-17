import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseURL = 'http://localhost:5000/api/customer/';

  constructor(private http: HttpClient) { }

  getCustomers(): any {
    return this.http.get(this.baseURL + 'list');
  }
}
