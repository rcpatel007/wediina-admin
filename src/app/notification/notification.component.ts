import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../model/brand';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as io from 'socket.io-client';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { getLocaleDateFormat } from '@angular/common';
import { Local } from 'protractor/built/driverProviders';
import { CategoryService } from '../services/category.service';
import { OrderService } from '../services/order.service';
import { Notificaiton } from '../model/notification'
import { User } from '../model/User';
import { ProductService } from '../services/product.service';
import { Product } from '../model/Product';
import { Dealertype } from '../model/Dealertype';
import { AccountService } from '../services/account.service';
import { log } from 'util';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  id: String;
  event_name = new Array();
  user_id: String;
  event_id = new Array();
  date: String;
  notificaiton: Notificaiton[];
  user: User[];
  brand: Brand[];
  // product: Product[];
  dealer: Account[];
  // event = new Array();
  event_array = new Array();


  constructor(private userservice: UserService,
    private brandservice: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryservice: CategoryService,
    private notificationservice: NotificationService,
    private orderservice: OrderService,
    private productservice: ProductService,
    private accountservice: AccountService) { }

  ngOnInit() {

    this.getNotification();

  }

  getNotification() {

    this.notificationservice.getNotification()
      .subscribe((data) => {
        
        console.log(data);
        this.notificaiton = data;

        this.userservice.getUser()
          .subscribe((user) => {
            this.user = user;
          });

        // event get
      });
    // console.log(this.notificaiton);
  }

  view(event_id) {
    console.log(event_id);

    let event = event_id.split('_');
    this.id = event[1];
    // console.log('yd' + event[0]);
    let id = this.id;

    switch (event[0]) {
      case 'br':
        this.router.navigate(['brand/']);

        break;

      case 'ca':
        this.router.navigate(['category/']);

        break;
      case 'or':
        this.router.navigate(['vieworder/', id]);
        break;
      case 'pr':

        this.router.navigate(['viewproduct/', id]);
        break;
      case 'de':
        this.router.navigate(['dealer/']);

        break;
      default:

        break;
    }
  }



}