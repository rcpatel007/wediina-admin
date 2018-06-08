import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelper } from '../Jwthelper';
import * as io from 'socket.io-client';
import { Token } from '@angular/compiler';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { NotificationService } from '../services/notification.service';
import { Notification } from 'rxjs';
import { Notificaiton } from '../model/notification';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  socket;
  id: String;
  msg = new Array();
  notification = new Array();
  name: String;
  user_id: String;
  email: String;
  read: any;
  // user
  role: String;
  o_view: boolean;
  d_view: boolean;
  i_view: boolean;
  b_view: boolean;
  c_view: boolean;

  constructor(private router: Router,
    private userservice: UserService,
    private loginService: LoginService,
    private notificaitonservice: NotificationService
  ) { this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }

  ngOnInit() {
    if (this.loginService.token === null) {
      this.router.navigate(["/login"]);
    }

    else if (this.loginService.token != null) {
      this.userRole();
    }

    //  this.socket.on('hello', (data) => console.log(data));
    this.socket.on('new-message', (result) => {
      // this.display = true;
      this.msg.push(+ result.data.name);

    });
    this.getNotificaiton();
    this.getuser(this.user_id);

  }


  userRole() {
    var jwtHelper = new JwtHelper();
    var parsedToken = jwtHelper.decodeToken(this.loginService.token);
    environment.user_id = parsedToken.id;
    console.log('login id' + environment.user_id);

  }

  getNotificaiton() {
    this.read = 0;

    this.notificaitonservice.getNotification()
      .subscribe((result) => {


        for (let i = 0; i < result.length; i++) {

          if (result.read !=true) {
            this.notification = result;
            this.read = this.read + 1;
          }
        }
        console.log(result);
      });
  }
  view(event_id) {
    console.log(event_id);
    this.read = this.read - 1;
    this.getNotificaiton();
    let event = event_id.split('_');
    this.id = event[1];
    // console.log('yd' + event[0]);
    let id = this.id;

    switch (event[0]) {
      case 'br':

        let notification = {
          read: true
        }
        console.log(notification);
        this.notificaitonservice.getNotificationById(id, notification)
          .subscribe(() => {


            this.router.navigate(['brand/']);

          });

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



  getuser(user_id) {
    let id = environment.user_id;

    this.userservice.getUserById(id)
      .subscribe((data) => {
        // console.log(data);
        this.name = data.name;
        this.email = data.email;

        this.o_view = data.order.view;
        this.i_view = data.product.view;
        this.d_view = data.dealer.view;
        this.b_view = data.brand.view;
        this.c_view = data.category.view;
        this.role = data.role;

        // console.log(this.role);

      });




  }


  logout() {
    localStorage.removeItem("token");
    this.loginService.logout()
      .subscribe(() => {

        localStorage.removeItem(this.loginService.token);
        this.router.navigate(["/login"]);
      });

  }


}
