import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../model/employee-model';
import { EmployeeService } from '../../service/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RoleModel } from 'src/app/model/role-model';
import { CustomerModel } from 'src/app/model/customer-model';
import { CustomerEmployeeService } from 'src/app/service/customer-employee.service';
@Component({
  selector: 'app-serve-employee',
  templateUrl: './serve-employee.component.html',
  styleUrls: ['./serve-employee.component.css']
})

export class ServeEmployeeComponent implements OnInit {

  public employees: EmployeeModel[] = [];
  public roles: RoleModel[] = [];
  public customers: CustomerModel[] = [];
  public dataChk = false;
  public errorMessage;
  public get: Function;
  public customerId: number;

  constructor(private _employeeService: EmployeeService, private router: Router, private route: ActivatedRoute, private customerEmployeeService: CustomerEmployeeService) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
     {
       this.customerId = +this.route.snapshot.paramMap.get('id')
       this.get= this.getCustomerEmployees;
     }
    else
      this.get = this.getEmployees;
    
    this.get();
    }
      


  getEmployees() {

    this._employeeService.getEmployee()
      .subscribe((data) => {
        this.employees = data
        this.dataChk = true
      },
        (error: any) => {
          this.dataChk = false;
          this.errorMessage = error.message
        });

  }

  getCustomerEmployees() {
    this.customerEmployeeService.getCustomerEmployee(this.customerId)
      .subscribe((data) => {
      
        this.employees = data
        this.dataChk = true
      
      },
        (error: any) => {
          this.dataChk = false;
          this.errorMessage = error.message
        });
  }

  getRolesAndCustomers() {

    forkJoin([this._employeeService.getRole(), this._employeeService.getCustomer()])
      .subscribe((result) => {
        this.roles = result[0],
          this.customers = result[1]
      },
        (error: any) => {
          this.dataChk = false;
          this.errorMessage = error.message

        });

  }

  addEmployee(): void {

    this.router.navigate(["add-employee"], { relativeTo: this.route });
  }

  deleteEmployee(id): void {

    this._employeeService.deleteEmployee(id)
      .subscribe(() => {
        this.employees = this.employees.filter(e => e.id != id);
      },
        (error: any) => {
          this.dataChk = false;
          this.errorMessage = error.message
        });
  }

  updateEmployee(updateEmployee) {

    const id = updateEmployee[0];
    const updatedEmployee = updateEmployee[1];
    console.log(updatedEmployee)

    this._employeeService.updateEmployee(id, updatedEmployee)
      .subscribe(() => {
        this.get();
      },
        (error: any) => {
          this.dataChk = false;
          this.errorMessage = error.message
        });
  }
}
