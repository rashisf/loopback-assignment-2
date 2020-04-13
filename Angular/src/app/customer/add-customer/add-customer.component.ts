import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerModel } from 'src/app/model/customer-model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  public form: FormGroup;
  public customer: CustomerModel;
  private editable = false;
  public errorMessage: Error;


  constructor(private formBuilder: FormBuilder, private router: Router, private customerService: CustomerService, private route: ActivatedRoute) {

    // this.route.params.forEach((params: Params) => {
    //   if (params['id'] !== undefined) {
    //     const id = +params['id'];
    //     this.customerService.getCustomerById(id)
    //       .subscribe(customer => {
    //         console.log(customer);
    //         this.customer = customer;
    //         this.editable = true;
    //         for (let c in customer)
    //           this.form.get(c)?.setValue(customer[c])
    //       });
    //   }
    // })
    if (this.route.snapshot.paramMap.get('id')) {
      const id = +this.route.snapshot.paramMap.get('id');
      this.customerService.getCustomerById(id)
        .subscribe(customer => {
          this.customer = customer;
          this.editable = true;
          for (let c in customer)
            this.form.get(c)?.setValue(customer[c])
        })
    }

  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({

      name: ["", Validators.compose([Validators.required, Validators.maxLength(20)])],

      website: ["", Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(/^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$/)])],

      address: ["", Validators.compose([Validators.required, Validators.maxLength(50)])]
    })
  }

  get name() {
    return this.form.get('name');
  }
  get website() {
    return this.form.get('website');
  }
  get address() {
    return this.form.get('address');
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.editable)
        this.updateCustomer()
      else
        this.createCustomer()
    }
  }

  updateCustomer() {

    this.customerService.updateCustomer(this.customer.id, this.form.value)
      .subscribe(() => {
        this.router.navigate(['customers']);
      },
        (error) => {
          this.errorMessage = error.message
        });

  }

  createCustomer() {
    this.customerService.createCustomer(this.form.value)
      .subscribe(() => {
        this.router.navigate(['customers']);
      },
        (error) => {
          this.errorMessage = error.message
        });
  }
}