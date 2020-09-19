import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { ListAddressesComponent } from './list-addresses/list-addresses.component';

const routes: Routes = [
  { path: 'customers', component: ListCustomersComponent },
  { path: 'addresses', component: ListAddressesComponent },
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: '**', redirectTo: 'customers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
