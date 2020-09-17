import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: any;
  nome = '';

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
