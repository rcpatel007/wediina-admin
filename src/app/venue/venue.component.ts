import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VenueService } from '../services/venue.service';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  venue = new Array;
  status =true;

  constructor(private router: Router,
    private venueservice: VenueService) { }

  ngOnInit() {
    this.venueDetail();
  }

  venueDetail(){

    this.venueservice.getVenues()
    .subscribe(res=>{
      this.venue=res;
  console.log(res);
    });
  }


  
  /*delete brand */
  Confirmvenuedelete(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
      // console.log(this.auth);

      return this.deleteVenue(id);
    }

    else
      return false;
  }


  deleteVenue(id) {
    this.venueservice.deleteVenue(id)
      .subscribe(result => {
        console.log(result);
        this.venueDetail();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }
}
