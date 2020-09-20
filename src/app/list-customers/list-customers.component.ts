import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_models/Customer';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  customer: Customer;
  registerForm: FormGroup;
  saveMode: string;

  constructor(
      private customerService: CustomerService,
      private modalService: BsModalService,
      private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.formValidation();
    this.getCustomers();
  }

  newCustomer(template: any) {
    this.saveMode = 'new';
    this.openModal(template);
  }

  editCustomer(customer, template: any) {
    this.saveMode = 'edit';
    this.openModal(template);
    this.customer = customer;

    this.registerForm.patchValue(customer);
  }

  deleteCustomer(customerId: number) {
    this.customerService.deleteCustomer(customerId)
    .subscribe(
      data => {
        this.getCustomers();
      },
      error => {
        console.log(error);
      }
    );
  }

  saveChanges(template: any) {
    if (this.saveMode === 'new') {
      if (this.registerForm.valid) {
        this.customer = Object.assign({}, this.registerForm.value);
        this.customerService.createCustomer(this.customer)
        .subscribe(
          data => {
            template.hide();
            this.getCustomers();
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      if (this.registerForm.valid) {
        this.customer = Object.assign({id: this.customer.id}, this.registerForm.value);
        this.customerService.updateCustomer(this.customer)
        .subscribe(
          data => {
            template.hide();
            this.getCustomers();
          },
          error => {
            console.log(error);
          }
        );
      }
    }
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

  openModal(template: any) {
      this.registerForm.reset();
      template.show();
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
}
