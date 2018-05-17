import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Order } from '../model/Order'
import { Globals } from '../../globals';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  count:any;
  auth:any;
  order: Order[];
  user:User[];
  product_details =new Array();

  constructor(private router: Router, 
    private orderService: OrderService,
    private loginservice: LoginService,
    private userservice:UserService,
    private globals: Globals) { }


  ngOnInit() {
    if (this.globals.token === null){
      this.router.navigate(["/login"]);
    }
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}
    this.getOrder(this.auth);
    this.getUser();
  }

  getOrder(auth) {
    this.count = 1;
    console.log(auth);
    
    this.orderService.getOrder()
                    .subscribe((Order) => {
                      this.order = Order;  
                    console.log(this.order);
                  });
                    
  }
  getUser(){
    this.userservice.getUser()
                    .subscribe((data) => {
                      //  console.log(account);
                      this.user =  data;
                      // console.log(this.role);
                      
                    });
  }
  

  viewOrder(id){
    this.orderService.viewOrder(id)
                    .subscribe((data) => {
                      this.product_details = data[0].products;
                    //  console.log(this.product_detail);
                    
                    // }
    });
  }
}