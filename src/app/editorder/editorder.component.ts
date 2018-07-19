import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { StockService } from '../services/stock.service';
import { log } from 'util';
import { Product } from '../model/Product';
import { DealerService } from '../services/dealer.service';
import { AccountService } from '../services/account.service';
declare var $: any;

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
  user_id: String;
  o_id: string;
  pid = new Array;
  cust_name: String;
  product_detail = new Array();
  o_date: String;
  d_date: String;
  d_time: String;
  o_discount: String;
  p_discount: String;
  status: String;
  methodvalue: String;
  statusvalue: String;
  showHide: boolean;
  stock = [];
  d_address: String;
  d_city: String;
  d_state: String;
  shipping: String;
  other_charge: String;
  dealer_email: String;
  charge: String;
  payment_status: String;
  payment_method: String;



  // user

  d_add: boolean;
  d_edit: boolean;
  d_view: boolean;
  d_delete: boolean;



  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private accountservice: AccountService,
    private userservice: UserService,
    private stockservice: StockService,
    private loginservice: LoginService
  ) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }

    this.getuser();
    this.route.params.subscribe(params => {
      this.o_id = params['id'];
    });
    this.getorderById(this.o_id);


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


  getorderById(_id) {
    let id = this.o_id;
    this.orderService.viewOrder(id)
      .subscribe(data => {
        // console.log(data);
        this.user_id = data.user_id;
        this.o_id = data._id;
        this.o_date = data.order_date;
        this.d_date = data._date;
        this.d_time = data._time;
        this.product_detail = data.products;
        this.d_address = data.address;
        this.d_city = data.city;
        this.d_state = data.state;
        this.o_discount = data.o_discount;
        this.statusvalue = data.status;
        this.methodvalue = data.method;
        this.shipping = data.shipping_charges;
        this.other_charge = data.other_charges;
        this.charge = data.charges;
        this.payment_method = data.payment_method,
        this.payment_status = data.payment_status,
          console.log();

        // console.log(this.product_detail);
        for (let index = 0; index < this.product_detail.length; index++) {
          this.pid.push(this.product_detail[index].prodcut_id);

        }
        console.log(this.pid);
        // }
        this.accountservice.getAccountById(this.user_id)
          .subscribe((user) => {
            this.dealer_email = user.email;
            // console.log(this.dealer_email);

          });

      });

  }



  // viewProduct(id){
  //  this.orderService.viewOrder(id)
  //                  .subscribe((data) => {
  //                    this.product_detail = data[0].products;
  //                  //  console.log(this.product_detail);

  //                  // }
  //  });

  // }

  /*Update order */
  updateOrder() {
    let updateorder = {
      _id: this.o_id,
      order_date: this.o_date,
      _date: this.d_date,
      _time: this.d_time,
      dealer_email: this.dealer_email,
      address: this.d_address,
      city: this.d_city,
      state: this.d_state,
      shipping_charges: this.shipping,
      charges: this.charge,
      other_charges: this.other_charge,
      payment_method: this.payment_method,
      payment_status: this.payment_status,
      // p_discount:this.p_discount,
      products: this.product_detail,
      user_id: this.user_id,
      o_discount: this.o_discount,
      status: this.statusvalue,
      method: this.methodvalue
    }
    console.log(updateorder);
    let product = [];
    let products = [];

    if (this.statusvalue == "In Process") {
      for (let index = 0; index < this.product_detail.length; index++) {
        let prod = {
          product_id: this.product_detail[index].prodcut_id,
          particular: this.product_detail[index].particular,
          qty: this.product_detail[index].qty
        }
        product.push({ "products": [prod] });

      }

      console.log(product);
      this.stockservice.orderStockUpdate(product)
        .subscribe(() => {
        });
    }


    // console.log(updateorder);
    // let flag: boolean;
    // console.log(updateorder);
    let id = this.o_id;
    // console.log(orderupdate);
    this.orderService.updateOrder(updateorder, id)
      .subscribe((res) => {
        this.router.navigate(['vieworder/' + this.o_id]);
        console.log(res);
      });
  }
  getuser() {
    let id = localStorage.user_id;
    // console.log('log' + localStorage.user_id);
    this.userservice.getUserById(id)
      .subscribe((data) => {
        this.d_add = data.dealer.add;
        this.d_edit = data.dealer.edit;
        this.d_view = data.dealer.view;
        this.d_delete = data.dealer.delete;
        //  console.log(account);
        // console.log(data);

      });
  }

}
