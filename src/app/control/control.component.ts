import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { ControlService } from '../services/control.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
homeads:any;
homeslider:any;
id:String;
name:String;
p_img:String;
uname:String;
ucity:string;
UvenueId:String;
UvendorId:String;
city:String;
base64:String;
venueid:String;
vendorid:String;
s_img:String;
  constructor(private router: Router,private controlservice:ControlService) { }

  ngOnInit() {

    this.getHomeAds();
    this.getHomeSlider();
  }
  getHomeAds(){
    this.controlservice.getHomeads()
    .subscribe(res=>{
      this.homeads =res;
console.log(res);

    });
  }

  getHomeSlider(){
    this.controlservice.gethomeslider()
    .subscribe(res=>{
      this.homeslider =res;
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
    this.controlservice.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.p_img = result.data.link;

      });

  }

  

  /* Image convert base64 */
  Sliderupload(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      
      var reader = new FileReader();

      reader.onload = this.slidertobase64.bind(this);
      reader.readAsBinaryString(file);
      
    }
  }

  slidertobase64(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
      // console.log(this.base64);
      
    // console.log(btoa(binaryString));
    this.controlservice.imgurImage(this.base64)
      .subscribe((result) => {
        console.log(result);
        this.s_img = result.data.link;

      });

  }

  addhomeads(){
    let homeads={
      name:this.name,
      venue_id:this.venueid,
      vendor_id:this.vendorid,
      image:this.p_img,
      city:this.city
    }
    console.log(homeads);
    this.controlservice.addHomeAds(homeads)
    .subscribe(res=>{
        console.log(res);
       this.getHomeAds(); 
    });
  }


  addhomeSlider(){
    let homeslider={
      image:this.s_img,
    }
    console.log(homeslider);
    this.controlservice.addhomeslider(homeslider)
    .subscribe(res=>{
        console.log(res);
       this.getHomeSlider(); 
    });
  }
  gethomeadsById(id){
    this.controlservice.getHomeAdsById(id)
    .subscribe(res=>{
      this.id=res._id;
      this.uname=res.name;
      this.p_img=res.image;
      this.ucity=res.city;
      this.UvendorId=res.vendor_id;
      this.UvenueId=res.venue_id;
    });
  }

  editHomeads(){
    let homeads={
      name:this.uname,
      venue_id:this.UvenueId,
      vendor_id:this.UvendorId,
      image:this.p_img,
      city:this.ucity
    }
    this.controlservice.editHomeAds(this.id,homeads)
    .subscribe(res=>{
      this.getHomeAds();


    });
  }



  
  /*delete brand */
  Confirmhomeads(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
      // console.log(this.auth);

      return this.deletehomeads(id);
    }

    else
      return false;
  }


  deletehomeads(id) {
    this.controlservice.deleteHomeAds(id)
      .subscribe(result => {
        console.log(result);
        this.getHomeAds();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }


  
  /*delete brand */
  Confirmhomeslider(id) {

    var x = confirm("Are you sure you want to delete?");
    if (x) {
      // console.log(this.auth);

      return this.deleteSlider(id);
    }

    else
      return false;
  }


  deleteSlider(id) {
    this.controlservice.deletehomeslider(id)
      .subscribe(result => {
        console.log(result);
        this.getHomeSlider();

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }
}
