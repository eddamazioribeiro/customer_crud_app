import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: any;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers(): any {
    this.customerService.getCustomers()
      .subscribe(
        res => {
          this.customers = res;
      }, err => {
        console.error(err);
      });
  }
}
