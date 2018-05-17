import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LoginService } from '../services/login.service';
import { Order } from '../model/Order';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category';
import { UserService } from '../services/user.service';
import { User } from '../model/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  new_count:any;
  pendding:any;
  enquiry:any;
  complate:any;
  order_count: any;
  order: Order[];
  user:User[];
  product_details =new Array();
  auth: any;
  enquriry_data:Order[];

  constructor(private router: Router,
    private loginservice:LoginService,
    private orderService: OrderService,
    private userservice:UserService,
    private globals: Globals) { 
  
  }
  
  ngOnInit() {
      if (this.loginservice.token === null){
      this.router.navigate(["/login"]);
      }
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}

    
    this.getOrder();
    this.getUser();

  }
  
  getUser(){
    this.userservice.getUser()
                    .subscribe((data) => {
                      //  console.log(account);
                      this.user =  data;
                      // console.log(this.role);
                      
                    });
  }
  
  getOrder() {
    this.new_count = 0;
    this.pendding = 0;
    this.enquiry = 0;
    this.complate =0;
    // console.log(auth);
    
    this.orderService.getOrder()
                    .subscribe((Order) => {
                      // console.log(Order);
                      
                        for(let i=0; i<Order.length; i++)
                          {
                            if(Order[i].status == 'new'){
                            this.new_count = this.new_count + 1;
                            // console.log(this.order_count);
                            }
                            if(Order[i].enquiry == 'true'){
                              this.enquiry = this.enquiry + 1;
                              // console.log(this.order_count);
                              this.enquriry_data =Order;
                            }
                              if(Order[i].status == 'pendding'){
                                this.pendding = this.pendding + 1;
                                // console.log(this.order_count);
                                }
                                if(Order[i].status == 'complate'){
                                  this.complate = this.complate + 1;
                                  // console.log(this.order_count);
                                  }
        
                          }

                          console.log(this.auth);
                          this.order = Order; 
                        
                          console.log(this.enquriry_data);
                        });
          }

// getOrder(auth) {
//   // let auth = {
//   //    "token": this.loginservice.token
//   //   }

//   this.count = 1;
//   this.order_count = 0;
//  console.log("g" +auth);
 
//   this.orderService.getOrder(auth)
//                   .subscribe((Order) => {
//                     console.log(Order.data);
                    
//                     for(let i=0; i<Order.data.length; i++)
//                       {
//                         if(Order.data[i].status == 'new'){
//                         this.order_count = this.order_count + 1;
//                         // console.log(this.order_count);
//                         }
//                       }
//                       // console.log(this.auth);
  
//                      this.order = Order.data;
                  
//                    console.log(this.order);
//                 });
                  
// }

viewOrder(id){
  this.orderService.viewOrder(id)
                  .subscribe((data) => {
                    this.product_details = data[0].products;
                  //  console.log(this.product_detail);
                   
                  // }
  });

}
}