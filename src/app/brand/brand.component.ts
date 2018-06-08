import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  socket;

  user_id: String;
  auth: any;
  brand: Brand[];
  id: String;
  name: String;
  slang: String;

  // user
  b_add: boolean;
  b_edit: boolean;
  b_view: boolean;
  b_delete: boolean;

  constructor(private brandService: BrandService,
    private loginservice: LoginService,
    private router: Router,
    private userservice: UserService,
    private notificaitonservice: NotificationService,
    private globals: Globals
  ) { this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }



  ngOnInit() {
    if (this.loginservice.token == null) {
      this.router.navigate(["/login"]);
    }
    this.id = environment.user_id;
    // this.user_id = environment.user_id;
    this.getuser();
    // this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.getBrand();


  }



  /* brand add*/
  addBrand() {

    let addbrand = {
      name: this.name,
    }

    this.brandService.addBrand(addbrand)
      .subscribe((res) => {
        // console.log(res);
        let date = Date.now();
        // let date_time = new Date(date);
        let finaldate = new Date(date);
        let event_id = "br_" + res.data._id;

        let notification = {
          title: "new Brand Add: "+this.name,
          user_id: environment.user_id,
          event_id: event_id,
          name:this.name,
          date_time: finaldate,
          read: false

        }
        console.log(notification);
        this.socket.emit('new-event', { data: addbrand });
        this.notificaitonservice.addNotification(notification)
          .subscribe(() => {

          });
        console.log(addbrand);
        this.getBrand();

      });
  }

  /*get brand by id */

  getBrandById(id) {
    this.brandService.getBrandById(id)
      .subscribe(data => {
        this.name = data.name;
        this.id = data._id;
        // this.slang =data[0].slang;
        // console.log(data);
      });


  }
  /* Update Brand Name*/
  editBrand() {
    let brand = {
      _id: this.id,
      name: this.name,
      // slang:this.slang      
    }
    this.brandService.editBrand(brand)
      .subscribe((data) => {
        let date_time = Date.now();
        let event_id = "br_" + data._id;

        let notification = {
          title: "Edit Brand :" + this.name,
          user_id: environment.user_id,
          event_id: event_id,
          name: this.name,
          date_time: date_time,
          read: false

        }
        // console.log(notification);
        this.socket.emit('new-event', { data: brand });
        this.notificaitonservice.addNotification(notification)
          .subscribe(() => {

          });

        console.log(brand);
        // this.editcloseBtn.nativeElement.click();
        this.getBrand();
      });
  }


  /*display brand*/
  getBrand() {
    this.brandService.getBrand()
      .subscribe(Brand => {
        this.brand = Brand;
        // console.log('helloooo'+environment.user_id);


      });
  }



  /*delete brand */
  ConfirmDelete(id) {

    var x = confirm("Are you sure you want to delete?" + id);
    if (x) {
      console.log(this.auth);

      return this.deleteBrand(id);
    }

    else
      return false;
  }


  deleteBrand(id) {
    this.brandService.deleteBrand(id)
      .subscribe(result => {
        console.log(result);
        this.getBrand();
      });
  }


  getuser() {


    console.log('lol ' + this.id);




    this.userservice.getUserById(this.id)
      .subscribe((data) => {
        this.b_add = data.brand.add;
        this.b_edit = data.brand.edit;
        this.b_view = data.brand.view;
        this.b_delete = data.brand.delete;
        console.log(data);


        //  console.log(account);
        // console.log(data);

      });
  }
}
