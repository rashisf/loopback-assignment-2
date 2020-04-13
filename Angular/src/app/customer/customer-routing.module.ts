import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServeCustomerComponent } from './serve-customer/serve-customer.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ServeEmployeeComponent } from '../employee/serve-employee/serve-employee.component';
import { AddEmployeeComponent } from '../employee/add-employee/add-employee.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: ServeCustomerComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: ':id', component: AddCustomerComponent  },
      {
        path: ':id/employees', children: [
          { path: '', component: ServeEmployeeComponent },
          { path: 'add-employee', component: AddEmployeeComponent },
          { path: ':id', component: AddCustomerComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
