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

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
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
    if (this.globals.token === null) {
      this.router.navigate(["/login"]);
    }
    this.auth = { "email": this.globals.email, "token": this.loginservice.token }
    this.getOrder();
    this.getAccount();
    this.getuser(this.user_id);
    
  }

  getOrder() {
    this.count = 1;

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

  getuser(user_id){
    let id =environment.user_id
   
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
}