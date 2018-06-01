import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';
import { LoginService } from '../services/login.service';

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
  o_discount: String;
  status: String;
  method: String;
  sub_total = 0;
  p_discount_total = 0;
  o_discount_total = 0;
  grand_total = 0;
  user_id: String;
  customername: String;
  email: String;
  company_name: String;
  mobile: String;
  address: String;
  gst_no: String;
  type: String;
  d_discount:String;

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
        this.product_detail = data.products;
        this.o_discount = data.o_discount;
        this.status = data.status;
        this.method = data.method;

        console.log(this.user_id);

        //  console.log(this.product_detail);
        for (let i = 0; i < this.product_detail.length; i++) {
          this.p_discount_total = (this.product_detail[i].price * this.product_detail[i].qty) - (this.product_detail[i].price * this.product_detail[i].qty) * this.product_detail[i].p_discount / 100;
          this.sub_total = this.sub_total + this.p_discount_total;
          // console.log(this.sub_total);

        }
        this.o_discount_total = this.sub_total * data.o_discount / 100;
        this.grand_total = Math.round(this.sub_total - this.o_discount_total);

        //  console.log(this.o_discount_total);
        this.orderservice.getAccountById(this.user_id)
        .subscribe(data => {
          this.customername = data.name;
          this.email = data.email;
          this.d_discount = data.discount;
          this.company_name= data.company_name;
          this.mobile = data.mobile;
          this.gst_no = data.gst;
          this.type = data.type;
      console.log(data);
      
        });  
        



      });

  }

}
