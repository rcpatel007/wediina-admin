import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer:any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private customerservice: CustomerService) { }

  ngOnInit() {

    this.getCustomer();
  }

  getCustomer(){
    this.customerservice.getCustomer().
    subscribe(res=>{
      console.log(res);
      
        this.customer=res;
    });
  }
}
