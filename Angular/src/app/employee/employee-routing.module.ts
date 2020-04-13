import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServeEmployeeComponent } from './serve-employee/serve-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';


const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: ServeEmployeeComponent },
      { path: 'add-employee', component: AddEmployeeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
