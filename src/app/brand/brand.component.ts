import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/Brand';
import { LoginService } from '../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Globals } from '../../globals';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { environment } from '../../environments/environment';
import { CategoryService } from '../services/category.service';

declare var $: any;

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  socket;
  term:String;
  user_id: String;
  auth: any;
  brand: Brand[];
  id: String;
  name: String = null;
  brandname: String;
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
    private categoryservice: CategoryService,
    private globals: Globals
  ) { this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }



  ngOnInit() {
    if (this.loginservice.token == null) {
      this.router.navigate(["/login"]);
    }
    this.id = localStorage.user_id;
    // this.u ser_id = localStorage.user_id;
    this.getuser();
    // this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.getBrand();


    $("script[src='assets/css/themes/collapsible-menu/materialize.css']").remove();
    $("script[src='assets/js/materialize.min.js']").remove();
    $("script[src='assets/js/scripts/advanced-ui-modals.js']").remove();

    var dynamicScripts = [
      "assets/css/themes/collapsible-menu/materialize.css",
      "assets/js/materialize.min.js",
      "assets/js/scripts/advanced-ui-modals.js",
    ];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }


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
          title: "new Brand Add: " + this.name,
          user_id: localStorage.user_id,
          event_id: event_id,
          name: this.name,
          date_time: finaldate,
          read: false

        }
        console.log(notification);
        this.socket.emit('new-event', { data: addbrand });
        this.notificaitonservice.addNotification(notification)
          .subscribe(() => {

          });

        this.getBrand();
        this.name = "";
        return

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
          title: "Edit Brand : " + this.name,
          user_id: localStorage.user_id,
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
        // console.log('helloooo'+localStorage.user_id);

      }

      );
  }


  delete(id) {
    let brandid = id;
    console.log(" id " + brandid);

    this.categoryservice.getCategory()
      .subscribe((Category) => {
        console.log(Category);
        let flag = false;
        for (let index = 0; index < Category.length; index++) {
          if (brandid === Category[index].brand_id) {
            flag = true;
            alert("This Brand Also Exists In Some other Categories. So, It Can Not Be Deleted.");
            break;
          }
        }

        if (flag == false) {
          this.ConfirmDelete(id);
        }
      });
  }

  /*delete brand */
  ConfirmDelete(id) {

    var x = confirm("Are you sure you want to delete?");
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

        // this.msg ="Brand is Delete"
        // return this.msg;

        // console.log(this.msg);
      });



  }


  getuser() {
    let id = localStorage.user_id;

    // console.log('lol ' + this.id)
    this.userservice.getUserById(id)
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

  printContent(id){
  
    let  str=document.getElementById(id).innerHTML
      let newwin=window.open('','printwin','left=10,top=10,width=1000,height=800')
      newwin.document.write('<HTML>\n<HEAD>\n')
      newwin.document.write('<TITLE> JasmaTech</TITLE>\n')
      newwin.document.write('<script>\n')
      newwin.document.write('function chkstate(){\n')
      newwin.document.write('if(document.readyState=="complete"){\n')
      newwin.document.write('window.close()\n')
      newwin.document.write('}\n')
      newwin.document.write('else{\n')
      newwin.document.write('setTimeout("chkstate()",2000)\n')
      newwin.document.write('}\n')
      newwin.document.write('}\n')
      newwin.document.write('function print_win(){\n')
      newwin.document.write('window.print();\n')
      newwin.document.write('chkstate();\n')
      newwin.document.write('}\n')
      newwin.document.write('<\/script>\n')
      newwin.document.write('</HEAD>\n')
      newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Brand </h4> \n\n')
      newwin.document.write(str)
      newwin.document.write('</BODY> \n')
      newwin.document.write('</HTML>\n')
      newwin.document.close()
      }
}
