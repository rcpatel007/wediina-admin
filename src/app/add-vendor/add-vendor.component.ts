import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {

  vendor_category =new Array;
  fname:String;
  lname:String;
  cname:String;
  cno:Number;
  email:String;
  pwd:String;
  catValue:String;
  package:String;
  gstno:String;
  area:String;
  city:String;
  state:String;
  address:String;
  p_img:String;
  oimg= new Array;
  o_img:any;
  location:String;
  desp:String;
  videolink:any;
  status = true;
  base64: any;
  otherbase64: any;
  


  constructor(private router: Router,
    private vendorservice: VendorService) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(){

    this.vendorservice.getVendorCategory()
    .subscribe(res=>{
      this.vendor_category = res;
        console.log(res);
        
    });
}


  /* Image convert base64 */
  imageUpload(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      
      var reader = new FileReader();

      reader.onload = this.imagetoBase64.bind(this);
      reader.readAsBinaryString(file);
      
    }
  }

  imagetoBase64(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
      // console.log(this.base64);
      
    // console.log(btoa(binaryString));
    this.vendorservice.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.p_img = result.data.link;

      });

  }
  /*add or remove input tag*/
  otherImageUpload(event) {
    let files = [].slice.call(event.target.files);
    // console.log(files);
    // input = files.map(f => f.name).join(', ');
    for (let i = 0; i < files.length; i++) {
      if (files) {
        var reader = new FileReader();
        reader.onload = this.otherimagetoBase64.bind(this);
        reader.readAsBinaryString(files[i]);
      }
    }
  }

  otherimagetoBase64(readeEvent) {
    var binaryString = readeEvent.target.result;
    this.otherbase64 = btoa(binaryString);
    // console.log(btoa(binaryString));
    this.vendorservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        console.log(result);
        this.oimg.push(result.data.link);
        console.log(this.oimg);

      });
    // console.log(this.oimg);
  }



  addVendor(){
    let video = this.videolink.split(",");
    console.log(video);
    
  
  
  
    let vendor={
           vendor_cat_id:this.catValue,
            fname:this.fname,
            lname: this.lname,
            package:this.package,
            status:this.status,
            companyName: this.cname,
            contactno: this.cno,
            email: this.email,
            gstno: this.gstno,
            password: this.pwd,
            address:this.address,
            area: this.area,
            city: this.city,
            state: this.state,
            image: this.p_img,
            sub_images: this.oimg,
            video_story:video,
            
        }
          this.vendorservice.addVendor(vendor)
          .subscribe(res=>{
            console.log(vendor);

          });

        

    }
  
  
}
