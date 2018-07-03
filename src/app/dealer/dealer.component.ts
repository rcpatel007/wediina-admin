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
import { CartService } from '../services/cart.service';

declare var $: any;

@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
})

export class DealerComponent implements OnInit {
  @ViewChild('add_dealer') add_dealer: ElementRef;
  socket;

  cont = "l";
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
  cart = new Array;
  state = new Set;
  e_city: String;
  e_state: String;
  city_value = new Set;
  satateValue: String;
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
    private cartservice: CartService,
    private globals: Globals) {
    this.socket = io('https://jasmatech-backend-api.herokuapp.com');
  }



  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }

    console.log(this.loginservice.token);
    // this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.viewaccount();
    this.getRole();
    this.getCity();
    this.id = localStorage.user_id;
    this.getuser();


    $("script[src='assets/css/themes/collapsible-menu/materialize.css']").remove();
    $("script[src='assets/js/materialize.min.js']").remove();
    $("script[src='assets/js/scripts/advanced-ui-modals.js']").remove();
    $("script[src='assets/vendors/data-tables/js/jquery.dataTables.min.js']").remove();
    $("script[src='assets/js/scripts/data-tables.js']").remove();


    var dynamicScripts = [
      "assets/css/themes/collapsible-menu/materialize.css",
      "assets/js/materialize.min.js",
      "assets/js/scripts/advanced-ui-modals.js",
      "assets/vendors/data-tables/js/jquery.dataTables.min.js",
      "assets/js/scripts/data-tables.js"
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
        for (let index = 0; index < data.length; index++) {
          this.state.add(data[index].state);

        }
        console.log(data);

      });
  }

  onChangeState(satateValue) {
    this.city_value.clear();
    this.cityservice.getcity()
      .subscribe((City) => {
        for (let index = 0; index < City.length; index++) {
          if (City[index].state == satateValue) {
            this.city_value.add(City[index].city);
          }
        }

        console.log(this.city_value);

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
        this.e_state = data.state;
        this.e_city = data.city;

        this.cartservice.getCartAll()
          .subscribe((Cart) => {
            this.cart = Cart;


          });

      });
  }

  addDealer() {

    let address_city = this.address + ":" + this.selectedValue +":"+ this.satateValue;
    let add = { 'office': [address_city], 'warehouse': [], 'other': [] };

    let add_dealer = {
      name: this.name,
      company_name: this.cnm,
      email: this.email,
      mobile: this.mno,
      address: add,
      state: this.satateValue,
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
          title: "Add New Dealer :" + this.name,
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
        // this.add_dealer.nativeElement.click();
        this.viewaccount();
      });
  }

  editDealer() {
    let account = {
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
    console.log(account);

    console.log(id);
    this.accountservice.editAccount(id, account)
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
        this.socket.emit('new-event', { data: account });
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
        this.viewaccount();
      });
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


  printContent(id) {

    let str = document.getElementById(id).innerHTML
    let newwin = window.open('', 'printwin', 'left=10,top=10,width=1000,height=800')
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
    newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Dealer Data </h4> \n\n')
    newwin.document.write(str)
    newwin.document.write('</BODY> \n')
    newwin.document.write('</HTML>\n')
    newwin.document.close()
  }

  radioChange(radio, id_l) {
    /* $("#" + radio).checked =true;
    $("#" +'l'+id_l ).addClass("z");
     */
    this.e_type = radio;


  }
}
