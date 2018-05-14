import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { LoginService } from '../services/login.service';
import { Order } from '../model/Order';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count:any;
  order_count: any;
  order: Order[];
  product_details =new Array();
  auth: any;

  constructor(private router: Router,private loginservice:LoginService , private orderService: OrderService, private globals: Globals) { 
  
  }
  
  ngOnInit() {
      if (this.loginservice.token === null){
      this.router.navigate(["/login"]);
      }
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}

    
    this.getOrder();

  }

  getOrder() {
    this.count = 1;
    // console.log(auth);
    
    this.orderService.getOrder()
                    .subscribe((Order) => {
                      console.log(Order.data);
                      
                        for(let i=0; i<Order.data.length; i++)
                          {
                            if(Order.data[i].status == 'new'){
                            this.order_count = this.order_count + 1;
                            // console.log(this.order_count);
                            }
                          }
                          // console.log(this.auth);
                          this.order = Order.data; 
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