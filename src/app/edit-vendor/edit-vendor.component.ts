import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {
  id: String;
  vendor_category = new Array;
  fname: String;
  lname: String;
  cname: String;
  cno: Number;
  email: String;
  pwd: String;
  catValue: String;
  package: String;
  gstno: String;
  area: String;
  city: String;
  state: String;
  address: String;
  location: String;
  desp: String;
  videolink: any;
  status = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vendorservice: VendorService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getVendor();
    this.getCategory();

  }

  getCategory() {

    this.vendorservice.getVendorCategory()
      .subscribe(res => {
        this.vendor_category = res;
        console.log(res);

      });
  }
  getVendor() {
    this.vendorservice.getVendorById(this.id)
      .subscribe(res => {
        this.catValue = res.vendor_cat_id;
        this.fname = res.fname;
        this.lname = res.lname;
        this.package = res.package;
        this.status = res.status;
        this.cname = res.companyName;
        this.cno = res.contactno;
        this.email = res.email;
        this.gstno = res.gstno;
        this.pwd = res.password;
        this.address = res.address;
        this.area = res.area;
        this.city = res.city;
        this.state = res.state;
        this.videolink = res.video_story;
        this.desp = res.desp;

      });
  }

  editVendor() {
    let updatecategory = {
       vendor_cat_id:this.catValue,
       fname:this.fname,
       lname:this.lname,
       package:this.package,
       status:this.status,
       companyName:this.cname,
       contactno:this.cno,
       email:this.email,
       gstno:this.gstno,
       password:this.pwd,
       address:this.address,
       area:this.area,
       city:this.city,
       state:this.state,
       video_story:this.videolink,
      desp:this.desp 
    }
   
     console.log(updatecategory);
    this.vendorservice.editVendor(this.id,updatecategory)
    .subscribe(res=>{
console.log(res);
this.router.navigate(['Vendors']);

    });
  }

}
