import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../model/Order';
import * as myGlobals from '../../globals';
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
  
  constructor(private router: Router, private orderService: OrderService) { }
  auth: any;

  ngOnInit() {
    if (environment.token === null){
      this.router.navigate(["/login"]);
    }
    this.auth ={"email":myGlobals.email,"refreshToken":myGlobals.refresh_token}
    this.getOrder(this.auth);
}

getOrder(auth) {
  

  this.count = 1;
  this.order_count = 0;
  this.orderService.getOrder(auth)
                  .subscribe((Order) => {
                    for(let i=0; i<Order.length; i++)
                      {
                        if(Order[i].status == 'new'){
                        this.order_count = this.order_count + 1;
                        console.log(this.order_count);
                        }
                      }
                      console.log(this.auth);
  
                     this.order = Order;
                  
                   console.log(this.order);
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