import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  vendor:any;

  constructor(private router: Router, private vendorservice:VendorService) { }

  ngOnInit() {

    this.getVendor();

  }


  getVendor(){

    this.vendorservice.getVendors().
    subscribe(res=>{
  
  this.vendor= res;
      console.log(res);
      
    });
  }

  
  /*delete brand */
  Confirmvenuedelete(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
      // console.log(this.auth);

      return this.deleteVendor(id);
    }

    else
      return false;
  }


  deleteVendor(id) {
    this.vendorservice.deleteVendor(id)
      .subscribe(result => {
        console.log(result);
        this.getVendor();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }
}
