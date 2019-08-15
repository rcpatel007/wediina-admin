import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
id:String;
cityName:String;
city=[];
updateCity:String;

  constructor(private router: Router,private controlservice:ControlService) { }

  ngOnInit() {
  this.getcity();
  }

  getcity(){
    this.controlservice.getcity()
    .subscribe(res=>{
    this.city =res;
    console.log(this.city);

    });
  }


  addcity(){
    
    let city={
      city:this.cityName
    }

    this.controlservice.addcity(city)
    .subscribe(res=>{
        console.log(res);
        this.getcity();
    });
  }


  getcityById(id){

    let cid =id;

    this.controlservice.getcitybyId(id)
    .subscribe(res=>{
      this.id =res._id;
      this.updateCity =res.city;

      console.log('hello',res);
      

    });
  }


  updateCityById(){

    let city={
      city:this.updateCity
    }

    this.controlservice.editcity(this.id,city)
    .subscribe(res=>{
      this.getcity();
    });
  }


    
  /*delete brand */
  ConfirmCity(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
      // console.log(this.auth);

      return this.deleteCity(id);
    }

    else
      return false;
  }


  deleteCity(id) {
    this.controlservice.deletecity(id)
      .subscribe(result => {
        console.log(result);
        this.getcity();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }

}
