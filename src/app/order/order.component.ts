import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    if (environment.token===null){
      this.router.navigate(["/login"]);
    }
    this.getOrder();
  }

  getOrder() {
    this.orderService.getOrder()
                    .subscribe((order) => {
                  
                      console.log(order);
                    });
                    
  }

}