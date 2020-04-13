import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerModel } from 'src/app/model/customer-model';
import { EmployeeModel } from 'src/app/model/employee-model';
import { RoleModel } from 'src/app/model/role-model';

@Component({
  selector: '[app-update-employee]',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],

})
export class UpdateEmployeeComponent implements OnInit, OnChanges {

  public saveForm: FormGroup;

  @Input('employee') e: EmployeeModel;
  @Input() roles: RoleModel[];
  @Input() customers: CustomerModel[];

  @Output() onCancel = new EventEmitter();
  @Output() onSave = new EventEmitter();

  constructor(private _employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if (this.saveForm && this.roles && this.customers && this.e) {
      const roleValue = (this.roles.filter(r => this.e.role === r.name))[0].id.toString();
      const customerValue = (this.customers.filter(c => this.e.customer === c.name))[0].id.toString();
      this.saveForm.get('roleId').setValue(roleValue);
      this.saveForm.get('customerId').setValue(customerValue);
    }
  }

  ngOnInit(): void {

    this.saveForm = this.fb.group({
      'id': [this.e.id],
      'firstName': [this.e.firstName, Validators.required],
      'middleName': [this.e.middleName],
      'lastName': [this.e.lastName, Validators.required],
      'phone': [this.e.phone, Validators.compose([Validators.required, Validators.pattern(/^[+]?[0-9]{10,13}$/)])],
      'email': [this.e.email, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      'address': [this.e.address, Validators.required],
      'roleId': [null, Validators.required],
      'customerId': [null, Validators.required]
    });

  }

  get firstName() {
    return this.saveForm.get('firstName');
  }
  get middleName() {
    return this.saveForm.get('middleName');
  }
  get lastName() {
    return this.saveForm.get('lastName');
  }
  get email() {
    return this.saveForm.get('email');
  }
  get phone() {
    return this.saveForm.get('phone');
  }
  get address() {
    return this.saveForm.get('address');
  }
  get roleId() {
    return this.saveForm.get('roleId');
  }

  get customerId() {
    return this.saveForm.get('customerId');
  }

  saveEmployee(id) {

    if (this.saveForm.valid) {
      {
        this.saveForm.value.roleId =  parseInt(this.saveForm.value.roleId);
        this.saveForm.value.customerId =  parseInt(this.saveForm.value.customerId);
        this.onSave.emit([id, this.saveForm.value]);
      }
     
    }
  }

  cancelEmployee(id) {

    this.onCancel.emit(id);
  }

}
