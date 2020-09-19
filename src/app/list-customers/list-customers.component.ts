import { Component, OnInit, TemplateRef } from '@angular/core';
import { CustomerService } from '../_services/customer.service';
import { Customer } from '../_models/Customer';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})

export class ListCustomersComponent implements OnInit {

  customers: Customer[];
  registerForm: FormGroup;
  // modalRef: BsModalRef;

  constructor(
      private customerService: CustomerService,
      private modalService: BsModalService,
      private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.formValidation();
    this.getCustomers();
  }

  save() {

  }

  openModal(cusomterId: number, template: any) {
    template.show();
    console.log('abre modal');
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
