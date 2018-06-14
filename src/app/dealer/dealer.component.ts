import { Component, OnInit, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

import { AccountService } from '../services/account.service';
import { Account } from '../model/Dealer';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { RoleService } from '../services/role.service';
import { Role } from '../model/Role';
import { DealertypeService } from '../services/dealertype.service';
import { CityService } from '../services/city.service';
import { City } from '../model/City';
import { UserService } from '../services/user.service';
import * as io from 'socket.io-client';
import { NotificationService } from '../services/notification.service';

declare var $: any;

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
})

export class DealerComponent implements OnInit {
  @ViewChild('add_dealer') add_dealer: ElementRef;
  socket;

  user_id: String;
  id: String;
  auth: any;
  account: Account[];
  role: Role[];
  city: City[];
  name: string = "";
  cnm: String = "";
  email: String = "";
  mno: String = "";
  all_address: JSON;
  gst: String = "";
  type: String = "";
  discount: String = "";
  selectedValue: any;
  e_name: string = "";
  e_cnm: String = "";
  e_email: String = "";
  e_mno: String = "";
  e_address: JSON;
  e_gst: String = "";
  e_type: String = "";
  e_discount: String = "";
  editValue: any;
  address: String;
  add = [];
  // user
  d_add: boolean;
  d_edit: boolean;
  d_view: boolean;
  d_delete: boolean;
  // error
  errorname: string;
  errorcnm: String;
  erroremail: String;
  errormno: String;
  erroradd: String;
  errorgst: String;
  errortype: String;
  errordiscount: String;
  errorcity: String;
  successmsg: String;

  // edit error message
  editerrorname: string = null;
  editerrorcnm: String = null;
  editerroremail: String = null;
  editerrormno: String = null;
  editerroradd: String = null;
  editerrorgst: String = null;
  editerrortype: String = null;
  editerrordiscount: String = null;
  editerrorcity: String = null;
  editsuccessmsg: String = null;

  constructor(private router: Router,
    private loginservice: LoginService,
    private accountservice: AccountService,
    private dealertypeservice: DealertypeService,
    private cityservice: CityService,
    private userservice: UserService,
    private notificationService: NotificationService,
    private globals: Globals) {
    this.socket = io('https://jasmatech-backend-api.herokuapp.com');
  }



  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }
    // this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.viewaccount();
    this.getRole();
    this.getCity();
    this.id = localStorage.user_id;
    this.getuser();

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



  getRole() {
    this.dealertypeservice.getType()
      .subscribe((data) => {
        //  console.log(account);
        this.role = data;
        console.log(data);

      });
  }

  getRoleValue(id) {
    this.dealertypeservice.getTypeById(id)
      .subscribe((data) => {
        this.discount = data.discount;
        console.log(data);

      })


  }

  getCity() {
    this.cityservice.getcity()
      .subscribe((data) => {
        //  console.log(account);
        this.city = data;
        console.log(data);

      });
  }

  viewaccount() {
    this.accountservice.getAccount()
      .subscribe((account) => {
        //  console.log(account);
        this.account = account;
        // console.log(account);

      });
  }

  viewDealer(id) {
    this.accountservice.getAccountById(id)
      .subscribe((data) => {
        console.log(data);
        this.id = data._id;
        this.e_name = data.name;
        this.e_cnm = data.company_name;
        this.e_email = data.email;
        this.e_mno = data.mobile;
        this.e_type = data.type;
        this.editValue = data.city;
        this.e_gst = data.gst;
        this.e_discount = data.discount;

      });
  }

  addDealer() {
    this.add.push({ 'office': [this.address] });

    if (this.name == null ||
      this.cnm == null ||
      this.email == null ||
      this.mno == null ||
      this.add == null ||
      this.selectedValue == null ||
      this.gst == null ||
      this.type == null ||
      this.discount == null) {

      this.errorname = "Please Enter Name";
      this.errorcnm = "Please Enter Company Name";
      this.erroremail = "Please Enter Email";
      this.errormno = "Please Enter Mobile No.";
      this.errorcity = "Please Select City.";
      this.errortype = "Please Select Dealer Type";
      this.errorgst = "Please Enter GST No.";
      this.erroradd = "Please Enter Address";
      this.errordiscount = "Please Enter Discount";
    }

    else if (this.name == null) {
      this.errorname = "Please Enter Name";
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.cnm == null) {
      this.errorcnm = "Please Enter Company Name";
      this.errorname = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.email == null) {
      this.erroremail = "Please Enter Email";
      this.errorname = null;
      this.errorcnm = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.mno == null) {
      this.errormno = "Please Enter Mobile No.";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.add == null) {
      this.erroradd = "Please Enter Address";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.errordiscount = null;
    }
    else if (this.selectedValue == null) {
      this.errorcity = "Please Select City";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.gst == null) {
      this.errorgst = "Please Enter GST No.";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.type == null) {
      this.errortype = "Please Select Dealer Type";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errorgst = null;
      this.erroradd = null;
      this.errordiscount = null;
    }
    else if (this.discount == null) {
      this.errordiscount = "Please Enter Discount";
      this.errorname = null;
      this.errorcnm = null;
      this.erroremail = null;
      this.errormno = null;
      this.errorcity = null;
      this.errortype = null;
      this.errorgst = null;
      this.erroradd = null;
    }
    else {
      let add_dealer = {
        name: this.name,
        company_name: this.cnm,
        email: this.email,
        mobile: this.mno,
        address: this.add,
        city: this.selectedValue,
        gst: this.gst,
        type: this.type,
        discount: this.discount


      }
      console.log(add_dealer);
      this.accountservice.addAccount(add_dealer)
        .subscribe((res) => {
          let date_time = Date.now();
          let event_id = "de_" + res.data._id;

          let notification = {
            title: "Add New Dealer" + this.name,
            user_id: localStorage.user_id,
            event_id: event_id,
            date_time: date_time,
            read: false

          }
          // console.log(notification);
          this.socket.emit('new-event', { data: add_dealer });
          this.notificationService.addNotification(notification)
            .subscribe(() => {

            });

          // console.log(add_dealer);

          this.name = null;
          this.cnm = null;
          this.email = null;
          this.mno = null;
          this.address = null;
          this.selectedValue = null;
          this.gst = null;
          this.type = null;
          this.discount = null;
          this.errorname = null;
          this.errorcnm = null;
          this.erroremail = null;
          this.errormno = null;
          this.errorcity = null;
          this.errortype = null;
          this.errorgst = null;
          this.erroradd = null;
          this.errordiscount = null;
          this.successmsg = "Dealer Sucessfully Added";
          // this.add_dealer.nativeElement.click();
          this.viewaccount();


        });
    }
  }

  editDealer() {
    // let edit_dealer = {
    //   name: this.e_name,
    //   company_name: this.e_cnm,
    //   email: this.e_email,
    //   mobile: this.e_mno,
    //   city: this.editValue,
    //   gst: this.e_gst,
    //   type: this.type,
    //   discount: this.e_discount
    // }
    // console.log(edit_dealer);

    if (this.e_name == null ||
        this.e_cnm == null ||
      this.e_email == null ||
      this.e_mno == null ||
      this.editValue == null ||
      this.e_gst == null ||
      this.e_type == null ||
      this.e_discount == null) {

      this.editerrorname = "Please Enter Name";
      this.editerrorcnm = "Please Enter Company Name";
      this.editerroremail = "Please Enter Email";
      this.editerrormno = "Please Enter Mobile No.";
      this.editerrorcity = "Please Select City.";
      this.editerrortype = "Please Select Dealer Type";
      this.editerrorgst = "Please Enter GST No.";
      this.editerrordiscount = "Please Enter Discount";
    }

    else if (this.name == null) {
      this.editerrorname = "Please Enter Name";

    }
    else if (this.cnm == null) {
      this.editerrorcnm = "Please Enter Company Name";

    }
    else if (this.email == null) {
      this.editerroremail = "Please Enter Email";

    }
    else if (this.mno == null) {
      this.editerrormno = "Please Enter Mobile No.";

    }
    else if (this.editValue == null) {
      this.editerrorcity = "Please Select City";

    }
    else if (this.gst == null) {
      this.editerrorgst = "Please Enter GST No.";

    }
    else if (this.type == null) {
      this.editerrortype = "Please Select Dealer Type";

    }
    else if (this.discount == null) {
      this.editerrordiscount = "Please Enter Discount";
    }
    else {
      let edit_dealer = {

        name: this.e_name,
        company_name: this.e_cnm,
        email: this.e_email,
        mobile: this.e_mno,
        city: this.editValue,
        gst: this.e_gst,
        type: this.type,
        discount: this.e_discount
      }
      let id = this.id;
      console.log(edit_dealer);
      this.accountservice.editAccount(id, edit_dealer)
        .subscribe((res) => {
          console.log(res);

          let date_time = Date.now();
          let event_id = "de_" + res.data._id;

          let notification = {
            title: "Edit Dealer : " + this.name,
            user_id: localStorage.user_id,
            event_id: event_id,
            date_time: date_time,
            read: false

          }
          // console.log(notification);
          this.socket.emit('new-event', { data: edit_dealer });
          this.notificationService.addNotification(notification)
            .subscribe(() => {

            });

          // console.log(add_dealer);
          this.name = null;
          this.cnm = null;
          this.email = null;
          this.mno = null;
          this.selectedValue = null;
          this.gst = null;
          this.type = null;
          this.discount = null;
          this.editerrorname = null;
          this.editerrorcnm = null;
          this.editerroremail = null;
          this.editerrormno = null;
          this.editerrorcity = null;
          this.editerrortype = null;
          this.editerrorgst = null;
          this.editerroradd = null;
          this.editerrordiscount = null;
          this.editsuccessmsg = "Dealer Sucessfully Edit";
          this.viewaccount();
        });
    }

  }
  getuser() {
    let id = localStorage.user_id;

    this.userservice.getUserById(id)
      .subscribe((data) => {
        this.d_add = data.dealer.add;
        this.d_edit = data.dealer.edit;
        this.d_view = data.dealer.view;
        this.d_delete = data.dealer.delete;
        //  console.log(account);
      });
  }



}
