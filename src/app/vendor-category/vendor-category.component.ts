import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendor-category',
  templateUrl: './vendor-category.component.html',
  styleUrls: ['./vendor-category.component.css']
})
export class VendorCategoryComponent implements OnInit {
  id:String;
  vendor_category = new Array;
  ename:String;
  catname:String;

  p_img:String;
  base64:String;
  constructor( private router: Router,
    private vendorservice: VendorService) { }
    ngOnInit() {
      this.getCategory()
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

  
    addCategory(){
  
      let category= {
        cat_img:this.p_img,
        vendor_cat_name: this.ename
      }
      this.vendorservice.addVendorCategory(category)
      .subscribe((res)=>{
        console.log(res);
        this.getCategory();
      });
  
    }
  
    getCategory(){
        this.vendorservice.getVendorCategory()
          .subscribe(res => {

           this.vendor_category =res;
            console.log(this.vendor_category);
          });
    }
  
    getCategoryById(id){
  
        this.vendorservice.getVendorCategoryById(id)
        .subscribe(res=>{
          this.p_img=res.image;
          this.catname= res.vendor_cat_name;
          this.id= res._id;
            console.log(res);
            
        });
    }
  
    editCategory(){
  
      let updatecategory= {
        id:this.id,
        cat_img:this.p_img,
        vendor_cat_name: this.catname
      }
      this.vendorservice.editVendorCategory(this.id,updatecategory)
      .subscribe((res)=>{
        console.log(res);
        this.getCategory();
      });
  
    }
  
    
    /*delete brand */
    ConfirmCategory(id) {
  
      var x = confirm("Are you sure you want to delete?");
      if (x) {
        // console.log(this.auth);
  
        return this.deleteCategory(id);
      }
  
      else
        return false;
    }
  
  
    deleteCategory(id) {
      this.vendorservice.deleteVendorCategory(id)
        .subscribe(result => {
          console.log(result);
          this.getCategory();
  
          // this.msg ="Brand is Delete"
          // return this.msg;
  
          // console.log(this.msg);
        });
  
  
  
    }
  
  
  

}
