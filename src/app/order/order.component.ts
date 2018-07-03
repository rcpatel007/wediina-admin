import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Order } from '../model/Order'
import { Globals } from '../../globals';
import { UserService } from '../services/user.service';
import { Account } from '../model/Dealer';
import { AccountService } from '../services/account.service';

declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  term:String;
  user_id: String;
  count: any;
  auth: any;
  order: Order[];
  account: Account[];
  product_details = new Array();

  // user
  o_add: boolean;
  o_edit: boolean;
  o_view: boolean;
  o_delete: boolean;


  constructor(private router: Router,
    private orderService: OrderService,
    private loginservice: LoginService,
    private accountservice: AccountService,
    private userservice: UserService,
    private globals: Globals) { }


  ngOnInit() {

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


    if (this.globals.token === null) {
      this.router.navigate(["/login"]);
    }
    this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.getOrder();
    this.getAccount();
    this.getuser(this.user_id);

  }

  getOrder() {

    this.orderService.getOrder()
      .subscribe((Order) => {
        this.order = Order;
        console.log(this.order);
      });

  }
  getAccount() {
    this.accountservice.getAccount()
      .subscribe((data) => {
        //  console.log(account);
        this.account = data;
        console.log(this.account);

      });
  }


  viewOrder(id) {
    this.orderService.viewOrder(id)
      .subscribe((data) => {
        this.product_details = data[0].products;
        //  console.log(this.product_detail);

        // }
      });
  }


  /*delete Order */
  ConfirmDelete(id) {
    var x = confirm("Are you sure you want to delete?");
    if (x)
      return this.deleteOrder(id);
    else
      return false;
  }


  deleteOrder(id) {
    this.orderService.deleteOrder(id)
      .subscribe(result => {
        console.log(result);
        this.getOrder();
      });
  }

  getuser(user_id) {
    let id = localStorage.user_id;

    this.userservice.getUserById(id)
      .subscribe((data) => {
        //  console.log(account);
        this.o_add = data.order.add;
        this.o_edit = data.order.edit;
        this.o_view = data.order.view;
        this.o_delete = data.order.delete;
        console.log(data);

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
      newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Order List </h4> \n\n')
      newwin.document.write(str)
      newwin.document.write('</BODY> \n')
      newwin.document.write('</HTML>\n')
      newwin.document.close()
      }
}