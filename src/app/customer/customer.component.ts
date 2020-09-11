import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit {

  customers: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): any {
    this.http.get('http://localhost:5000/api/customer/list')
      .subscribe(
        res => {
          this.customers = res;
      }, err => {
        console.error(err);
      });
  }
}
