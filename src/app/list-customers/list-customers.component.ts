import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_models/Customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  registerForm: FormGroup;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.formValidation();
    this.getCustomers();
  }

  save() {

  }

  formValidation() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      eMail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      birthDate: new FormControl('', [
        Validators.required
      ])
    });
  }

  getCustomers() {
    this.customerService.getAllCustomers()
      .subscribe(
        (_customers: Customer[]) => {
          this.customers = _customers;
      }, err => {
        console.error(err);
      });
  }
}
