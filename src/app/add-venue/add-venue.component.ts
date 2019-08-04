import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VenueService } from '../services/venue.service';

@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.css']
})
export class AddVenueComponent implements OnInit {
  venue_category =new Array;
  package:String;
  fname:String;
  lname:String;
  cname:String;
  cno:Number;
  email:String;
  pwd:String;
  catValue:String;
  gstno:String;
  area:String;
  city:String;
  state:String;
  address:String;
  parking:String;
  catringValue:String;
  themepermission:String;
  p_img:String;
  oimg= new Array;
  o_img:any;
  timeper:String;
  areavenue:String;
  cop:String;
  location:String;
  desp:String;
  videolink:any;
  status = true;
  base64: any;
  otherbase64: any;
  


  constructor(private router: Router,
    private venueservice: VenueService) { }

  ngOnInit() {
    this.getCategory();
  }



  getCategory(){
    this.venueservice.getVenueCategory()
      .subscribe(res => {
       this.venue_category =res;
        console.log(this.venue_category);
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
    this.venueservice.imgurImage(this.base64)
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
    this.venueservice.imgurotherImage(this.otherbase64)
      .subscribe((result) => {
        console.log(result);
        this.oimg.push(result.data.link);
        console.log(this.oimg);

      });
    // console.log(this.oimg);
  }

  addVenue(){
  let video = this.videolink.split(",");
  console.log(video);
  


    let venue={
        venue_cat_id: this.catValue,
        fname: this.fname,
        lname:this.lname ,
        package_time:this.package,
        companyName: this.cname,
        contactno: this.cno ,
        email:this.email ,
        gstno: this.gstno ,
        status: this.status,
        password: this.pwd,
        address: this.address,
        city: this.city,
        state: this.state ,
        parking:this.parking,
        catringValue: this.catringValue,
        themepermission: this.themepermission,
        p_img: this.p_img,
        oimg: this.oimg,
        timeper:this.timeper,
        areavenue:this.area,
        cop:this.cop,
        location:this.location,
        desp:this.desp,
        video_story:video,
        }

        console.log(venue);
        
        this.venueservice.addVenue(venue)
        .subscribe(res=>{

          console.log(res);
          

        });
  }


}
