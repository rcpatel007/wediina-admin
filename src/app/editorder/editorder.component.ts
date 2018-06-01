import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {
  user_id: String;
  o_id: string;
  cust_name: String;
  product_detail = new Array();
  o_date: String;
  d_date: String;
  d_time: String;
  o_discount: String;
  p_discount:String;
  status: String;
  methodvalue: String;
  statusvalue: String;
  showHide: boolean;


  // user

  d_add: boolean;
  d_edit: boolean;
  d_view: boolean;
  d_delete: boolean;



  constructor(private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private loginservice: LoginService
  ) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }

    this.getuser(this.user_id);
    this.route.params.subscribe(params => {
      this.o_id = params['id'];
    });
    this.getorderById(this.o_id);

  }


  getorderById(_id) {
    let id = this.o_id;
    this.orderService.viewOrder(id)
      .subscribe(data => {
        console.log(data);
        this.user_id = data.user_id;
        this.o_id = data._id;
        this.o_date = data.order_date;
        this.d_date = data._date;
        this.d_time = data._time;
        this.product_detail = data.products;
        this.o_discount = data.o_discount;
        this.statusvalue = data.statusValue;
        this.methodvalue = data.method;
        console.log(this.product_detail);

         console.log('helloo'+data.methodvalue);
        // }
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
      // p_discount:this.p_discount,
      products: this.product_detail,
      user_id: this.user_id,
      o_discount: this.o_discount,
      status: this.statusvalue,
       method: this.methodvalue
    }
    console.log(updateorder);
    let id = this.o_id;
    // console.log(orderupdate);
    this.orderService.updateOrder(updateorder,id)
      .subscribe((res) => {
        this.router.navigate(['vieworder/' + this.o_id]);

        console.log(res);
      });
  }
  getuser(user_id) {
    let id = environment.user_id;
    console.log('log'+environment.user_id);
    

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
