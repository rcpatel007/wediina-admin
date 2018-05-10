import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Order } from '../model/Order'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  count:any;
  auth:any;
  order: Order[];
  product_details =new Array();

  constructor(private router: Router, private orderService: OrderService) { }


  ngOnInit() {
    if (environment.token===null){
      this.router.navigate(["/login"]);
    }
    this.getOrder(this.auth);
}

getOrder(auth) {
  this.count = 1;
  
  this.orderService.getOrder(auth)
                  .subscribe((Order) => {
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