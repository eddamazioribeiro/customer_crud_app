import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_models/Customer';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  registerForm: FormGroup;

  constructor(
      private customerService: CustomerService,
      private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.formValidation();
    this.getCustomers();
  }

  save() {

  }

  formValidation() {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      eMail: ['', [
        Validators.required,
        Validators.email
      ]],
      birthDate: ['', [
        Validators.required
      ]]
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
