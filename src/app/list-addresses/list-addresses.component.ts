import { Component, OnInit } from '@angular/core';
import { Address } from '../_models/Address';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../_services/address.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {

  customerId: number;
  addresses: Address[];
  address: Address;
  registerForm: FormGroup;
  saveMode: string;

  constructor(
      private addressService: AddressService,
      private modalService: BsModalService,
      private fb: FormBuilder,
      private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.route
    .paramMap
    .subscribe(
      params => {
        this.customerId = Number(params.get('customerId'));
        console.log(this.customerId);
      });

    this.formValidation();
    this.getAddresses(this.customerId);
  }

  newAddress(template: any) {
    this.saveMode = 'new';
    this.openModal(template);
  }

  editAddress(address: Address, template: any) {
    this.saveMode = 'edit';
    this.openModal(template);
    this.address = address;

    this.registerForm.patchValue(this.address);
  }

  deleteAddress(addressId: number) {
    this.addressService.deleteAddress(addressId)
    .subscribe(
      data => {
        this.getAddresses(this.customerId);
      },
      error => {
        console.log(error);
      }
    );
  }

  saveChanges(template: any) {
    if (this.saveMode === 'new') {
      if (this.registerForm.valid) {
        this.address = Object.assign({}, this.registerForm.value);
        this.addressService.createAddress(this.customerId, this.address)
        .subscribe(
          data => {
            console.log(data);
            template.hide();
            this.getAddresses(this.customerId);
          },
          error => {
            console.log(error);
          }
        );
      }
    } else {
      if (this.registerForm.valid) {
        this.address = Object.assign({id: this.address.id}, this.registerForm.value);
        this.addressService.updateAddress(this.address)
        .subscribe(
          data => {
            template.hide();
            this.getAddresses(this.customerId);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  getAddresses(customerId: number) {
    this.addressService.getUserAddresses(customerId)
      .subscribe(
        (_addresses: Address[]) => {
          this.addresses = _addresses;
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
      street: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      number: ['', [
        Validators.required
      ]],
      complement: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      zipCode: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]],
      state: ['', [
        Validators.required
      ]]
    });
  }
}