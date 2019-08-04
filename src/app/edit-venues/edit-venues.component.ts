import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { VenueService } from '../services/venue.service';


@Component({
  selector: 'app-edit-venues',
  templateUrl: './edit-venues.component.html',
  styleUrls: ['./edit-venues.component.css']
})
export class EditVenuesComponent implements OnInit {
  id:String;
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
  timeper:String;
  areavenue:String;
  cop:String;
  location:String;
  desp:String;
  videolink:any;
  status = true;
  base64: any;
  otherbase64: any;
 

  constructor(private route: ActivatedRoute,
    private router: Router,
    private venueservice: VenueService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  
  this.getCategory();
    this.getVenueById();
  
  }

  
  getCategory(){
    this.venueservice.getVenueCategory()
      .subscribe(res => {
       this.venue_category =res;
        console.log(this.venue_category);
      });
}



  getVenueById(){

    this.venueservice.getVenueById(this.id)
    .subscribe((res)=>{
      
      this.id= res._id;
      this.package= res.package;
      this.fname= res.fname;
      this.lname= res.lname;
      this.cname= res.companyName;
      this.cno= res.contactno;
      this.email= res.email;
      this.pwd= res.password;
      this.catValue= res.venue_cat_id;
      this.gstno= res.gstno;
      this.area= res.areavenue;
      this.city= res.city;
      this.state= res.state;
      this.address= res.address;
      this.parking= res.parking;
      this.catringValue= res.catringValue;
      this.themepermission= res.themepermission;
      // this.p_img= res.image;
      // this.oimg= res.sub_img;
      this.timeper= res.timeper;
      this.areavenue= res.area;
      this.cop= res.cop;
      this.location= res.location;
      this.desp= res.desp;
      this.videolink=res.video_story;
      this.status = res.status;
      
        console.log(res); 

    });
  }

  editVenue(){
    
    let video = this.videolink.split(",");
    console.log(video);
    
  
  
      let updateVenue={
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
          console.log(this.id);
          

          this.venueservice.editVenue(this.id,updateVenue)
            .subscribe(res=>{
                console.log(res);
                this.router.navigate(['venues']);  
            });


  

  }

}
