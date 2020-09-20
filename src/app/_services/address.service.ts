import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../_models/Customer';
import { Address } from '../_models/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  baseURL = 'http://localhost:5000/api/address';

  constructor(private http: HttpClient) { }

  getUserAddresses(customerId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.baseURL}/list/${customerId}`);
  }

  createAddress(customerId: number, address: Address) {
    return this.http.post(`${this.baseURL}/${customerId}`, address);
  }

  updateAddress(address: Address) {
    return this.http.put(`${this.baseURL}`, address);
  }

  deleteAddress(addressId: number) {
    return this.http.delete(`${this.baseURL}/${addressId}`);
  }
}
