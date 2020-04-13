import { Component, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/model/customer-model';
import { CustomerService } from 'src/app/service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-serve-customer',
  templateUrl: './serve-customer.component.html',
  styleUrls: ['./serve-customer.component.css']
})
export class ServeCustomerComponent implements OnInit {

  public customers: CustomerModel[] = [];
  public dataCheck = false;
  public errorMessage;
  constructor(private customerService: CustomerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.customerService.getCustomer()
      .subscribe(data => {
        this.dataCheck = true;
        this.customers = data;
      }
        ,
        (error: any) => {
          this.dataCheck = false;
          this.errorMessage = error.message
        });
  }

  deleteCustomer(id: number) {

    this.customerService.deleteCustomer(id)
      .subscribe(() => {
        this.customers = this.customers.filter(c => c.id != id);
      },
        (error: any) => {
          this.dataCheck = false;
          this.errorMessage = error.message
        });

  }

  editCustomer(id) {

    const customer = this.customers.filter(c => c.id === id);
    this.router.navigate(["customers/", id]);
  }

  addCustomer() {
    this.router.navigate(["add-customer"], { relativeTo: this.route });
  }

  showEmployees(id)
  {
    this.router.navigate([id,'employees'],{relativeTo: this.route })
  }
}
