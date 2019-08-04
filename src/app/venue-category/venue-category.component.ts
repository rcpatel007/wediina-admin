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


  constructor(  private router: Router,
    private venueService: VenueService) { }

  ngOnInit() {
    this.getCategory()
  }

  addCategory(){

    let category= {
      venue_cat_name: this.ename
    }
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
        this.id= res._id;
          console.log(res);
          
      });
  }

  editCategory(){

    let updatecategory= {
     
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
