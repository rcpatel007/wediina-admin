import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';

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




@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
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
  name: string;
  cnm: String;
  email: String;
  mno: String;
  address: JSON;
  gst: String;
  type: String;
  discount: String;
  selectedValue: any;

  // user

  d_add: boolean;
  d_edit: boolean;
  d_view: boolean;
  d_delete: boolean;


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
    this.id = environment.user_id;
    this.getuser();
    


  }



  getRole() {
    this.dealertypeservice.getType()
      .subscribe((data) => {
        //  console.log(account);
        this.role = data;
        console.log(data);

      });
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
        this.name = data.name;
        this.cnm = data.company_name;
        this.email = data.email;
        this.mno = data.mobile;
        this.type = data.type;
        this.gst = data.gst;
        this.discount = data.discount;

      });
  }

  // editDealer(){
  //   let edit_dealer= {
  //     name: this.name,
  //     company_name: this.cnm,
  //     email: this.email,
  //     mobile: this.mno, 
  //     city:this.selectedValue,
  //     gst:this.gst,
  //     type: this.type,
  //     discount: this.discount
  //   }
  //     this.accountservice.(edit_dealer)
  //     .subscribe(() => {
  //       // console.log(add_dealer);
  //       this.viewaccount();

  //     });

  // }
  // }
  addDealer() {
    let add_dealer = {
      name: this.name,
      company_name: this.cnm,
      email: this.email,
      mobile: this.mno,
      city: this.selectedValue,
      gst: this.gst,
      type: this.type,
      discount: this.discount


    }
    console.log(add_dealer);
    this.accountservice.addAccount(add_dealer)
      .subscribe((res) => {
        let date_time = Date.now();
        let event_id = "de_" +res.data._id;

        let notification = {
          title: "Add New Dealer",
          user_id: environment.user_id,
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
        this.viewaccount();

      });
  }


  getuser() {
    console.log('lol '+this.id);
    
    this.userservice.getUserById(this.id)
      .subscribe((data) => {
        this.d_add = data.dealer.add;
        this.d_edit = data.dealer.edit;
        this.d_view = data.dealer.view;
        this.d_delete = data.dealer.delete;
        //  console.log(account);
        console.log('1022000000000000000000000-----------'+data);

      });
  }



}
