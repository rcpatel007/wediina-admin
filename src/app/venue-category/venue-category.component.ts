import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VenueService } from '../services/venue.service';

@Component({
  selector: 'app-venue-category',
  templateUrl: './venue-category.component.html',
  styleUrls: ['./venue-category.component.css']
})
export class VenueCategoryComponent implements OnInit {
  id:String;
  venue_category = new Array;
  ename:String;
  catname:String;
  p_img:String;
  base64:String;


  constructor(  private router: Router,
    private venueService: VenueService) { }

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
    this.venueService.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.p_img = result.data.link;

      });

  }


  addCategory(){

    let category= {
      cat_img:this.p_img,
      venue_cat_name: this.ename
    }

    console.log(category
      );
    
    this.venueService.addVenueCategory(category)
    .subscribe((res)=>{
      console.log(res);
      this.getCategory();
    });

  }

  getCategory(){
      this.venueService.getVenueCategory()
        .subscribe(res => {
         this.venue_category =res;
          console.log(this.venue_category);
          
         
        });
  }

  getCategoryById(id){

      this.venueService.getVenueCategoryById(id)
      .subscribe(res=>{
        this.catname= res.venue_cat_name;
        this.p_img=  res.image,
        this.id= res._id;
          console.log(res);
          
      });
  }

  editCategory(){

    let updatecategory= {
      cat_img:this.p_img,
      venue_cat_name: this.catname
    }
    this.venueService.editvenueCategory(this.id,updatecategory)
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
    this.venueService.deleteVenueCategory(id)
      .subscribe(result => {
        console.log(result);
        this.getCategory();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }



}
