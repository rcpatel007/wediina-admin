import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';


import { JwtHelper } from '../JwtHelper';
import { partition } from 'rxjs/operators';

declare var window: any;
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  term: String;
  user_id: String;
  newcount: any;
  pendding: any;
  enquiry: any;
  complate: any;
  order_count: any;
  order = new Array;
  penddingOrder = new Array;
  account: Account[];
  product_details = new Array();
  auth: any;
  enquriryData = new Array;
  compalet_order = new Array();
  // user

  o_add: boolean;
  o_edit: boolean;
  o_view: boolean;
  o_delete: boolean;

  d_add: boolean;
  d_edit: boolean;
  d_view: boolean;
  d_delete: boolean;

  i_add: boolean;
  i_edit: boolean;
  i_view: boolean;
  i_delete: boolean;

  b_add: boolean;
  b_edit: boolean;
  b_view: boolean;
  b_delete: boolean;

  c_add: boolean;
  c_edit: boolean;
  c_view: boolean;
  c_delete: boolean;

  constructor(private router: Router,
    private loginservice: LoginService,
    private globals: Globals) {
    // router.events.subscribe(s => {
    //   if (s instanceof NavigationEnd) {
    //     const tree = router.parseUrl(router.url);
    //     if (tree.fragment) {
    //       const element = document.querySelector("#" + tree.fragment);
    //       if (element) { element.scrollIntoView(true); }
    //     }

    // });



  }

  ngOnInit() {

    // console.log(this.loginservice.token+"token");
    // this.auth = {"email": this.loginservice.token,"token": this.loginservice.token}  
    // this.getOrder();
    // this.getAccount();
    // this.getuser(this.user_id);


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

  goTo(location: string): void {
    window.location.hash = location;
  }
  // getuser(user_id) {
  //   let id = localStorage.user_id;
  //   // let id = localStorage.user_id;
  //   this.userservice.getUserById(id)
  //     .subscribe((data) => {
  //       //  console.log(account);
  //       this.o_add = data.order.add;
  //       this.o_edit = data.order.edit;
  //       this.o_view = data.order.view;
  //       this.o_delete = data.order.delete;
  //       // console.log(data);
  //     });
  // }

  // getAccount() {
  //   this.accountservice.getAccount()
  //     .subscribe((data) => {
  //       //  console.log(account);
  //       this.account = data;
  //       // console.log(this.account);
  //     });
  // }

  // getOrder() {
  //   this.newcount = 0;
  //   this.pendding = 0;
  //   this.enquiry = 0;
  //   this.complate = 0;
  //   // console.log(auth);
  //   this.orderService.getOrder()
  //     .subscribe((Order) => {
  //       // console.log(Order);

  //       for (let i = 0; i < Order.length; i++) {
  //         if (Order[i].status === "Received") {

  //           this.order.push(Order[i]);
  //           this.newcount = this.newcount + 1;
  //           // console.log(this.order);
  //           // console.log(this.newcount);
  //         }
  //         else if (Order[i].status == "In Process") {
  //           this.pendding = this.pendding + 1;
  //           this.penddingOrder.push(Order[i]);
  //           console.log('order' + this.penddingOrder);
  //         }
  //         else if (Order[i].status == "completed") {
  //           this.complate = this.complate + 1;
  //           this.compalet_order.push(Order[i]);
  //           console.log(this.compalet_order);
  //         }
  //         else {
  //           this.enquiry = this.enquiry + 1;
  //           // console.log(this.order_count);
  //           this.enquriryData.push(Order[i]);
  //         }
  //       }
  //       // console.log(this.order);
  //       // console.log(this.enquriry_data);
  //     });
  // }
  // viewOrder(id) {
  //   this.orderService.viewOrder(id)
  //     .subscribe((data) => {
  //       this.product_details = data.products;
  //       // console.log(this.product_details);
  //       // }
  //     });
  // }
  // /*delete order */
  // ConfirmDelete(id) {
  //   var x = confirm("Are you sure you want to delete?");
  //   if (x)
  //     return this.deleteOrder(id);
  //   else
  //     return false;
  // }
  // deleteOrder(id) {
  //   this.orderService.deleteOrder(id)
  //     .subscribe(result => {
  //       // console.log(result);
  //       this.getOrder();
  //     });
  // }
}