import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';
import { LoginService } from '../services/login.service';
declare var $: any;

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
  id: String;
  _id: string;
  cust_name: String;
  product_detail = new Array();
  o_date: String;
  d_date: String;
  d_time: String;
  d_address: String;
  d_city: String;
  d_state: String;
  o_discount: String;
  status: String;
  method: String;
  sub_total = 0;
  p_discount_total: number;
  o_discount_total: number;
  grand_total: number;
  user_id: String;
  customername: String;
  email: String;
  company_name: String;
  mobile: String;
  address: String;
  gst_no: String;
  type: String;
  d_discount: String;
  cgst: number;
  sgst: number;
  igst: number;
  shipping: number = 0;
  other_charges: number = 0;
  state = String;
  isGujarat: boolean;
  sgst_total: number = 0;
  cgst_total: number = 0;
  igst_total: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderservice: OrderService,
    private accountservice: AccountService,
    private loginservice: LoginService) { }


  ngOnInit() {

    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }


    this.route.params.subscribe(params => {
      this._id = params['id'];
    });
    this.getorderById(this._id);

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


  // single order

  getorderById(id) {
    this.orderservice.viewOrder(id)
      .subscribe(data => {
        //  console.log(data);
        this._id = data._id;
        this.user_id = data.user_id;
        this.o_date = data.order_date;
        this.d_date = data._date;
        this.d_time = data._time;
        this.d_address = data.address;
        this.d_city = data.city;
        this.d_state = data.state;
        this.shipping = data.shipping_charges;
        this.other_charges = data.other_charges;
        this.product_detail = data.products;
        this.state = data.state;
        this.o_discount = data.o_discount;
        this.status = data.status;
        this.method = data.method;


        //  console.log(this.product_detail);
        for (let i = 0; i < this.product_detail.length; i++) {
          this.p_discount_total = (this.product_detail[i].price * this.product_detail[i].qty) - (this.product_detail[i].price * this.product_detail[i].qty) * this.product_detail[i].p_discount / 100;
          this.sub_total = Math.round(this.sub_total + this.p_discount_total);
          // console.log(this.sub_total);

        }

        if (data.state == 'gujarat') {
          this.isGujarat = true;
          for (let index = 0; index < this.product_detail.length; index++) {

            let prod_tot =((this.product_detail[index].price * this.product_detail[index].qty)) - ((this.product_detail[index].price * this.product_detail[index].qty) * this.product_detail[index].p_discount) / 100;
            let cgst = Math.round(prod_tot * Number(this.product_detail[index].cgst_no) 
            / 100);
            this.cgst_total = this.cgst_total + cgst;
            let sgst = Math.round(prod_tot * Number(this.product_detail[index].sgst_no) / 100);
            this.sgst_total = this.sgst_total + sgst;
          }

        }
        else {
          this.isGujarat = false;

          for (let index = 0; index < this.product_detail.length; index++) {
            let prod_tot =((this.product_detail[index].price * this.product_detail[index].qty)) - ((this.product_detail[index].price * this.product_detail[index].qty) * this.product_detail[index].p_discount) / 100;
            let igst = Math.round(prod_tot * Number(this.product_detail[index].igst_no) / 100);
            this.igst_total = this.igst_total + igst;

            console.log(this.igst_total);

          }

        }
        this.o_discount_total = Math.round(this.sub_total * data.o_discount / 100);
        this.grand_total = Math.round((this.sub_total - this.o_discount_total) + this.igst_total + this.cgst_total + this.sgst_total + this.shipping + this.other_charges);


        //  console.log(this.o_discount_total);
        this.orderservice.getAccountById(this.user_id)
          .subscribe(data => {
            this.customername = data.name;
            this.email = data.email;
            this.d_discount = data.discount;
            this.company_name = data.company_name;
            this.mobile = data.mobile;
            this.gst_no = data.gst;
            this.type = data.type;
            console.log(data);

          });




      });

  }

}
