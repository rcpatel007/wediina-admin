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
declare var $:any;

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
  n_id: String;
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

    $("script[src='assets/css/themes/collapsible-menu/materialize.css']").remove();
    $("script[src='assets/js/materialize.min.js']").remove();
    $("script[src='assets/js/scripts/advanced-ui-modals.js']").remove();

    var dynamicScripts = [
      "assets/css/themes/collapsible-menu/materialize.css",
      "assets/js/materialize.min.js",
      "assets/js/scripts/advanced-ui-modals.js",
    ];

    for (var i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }



  }

  userRole() {
    var jwtHelper = new JwtHelper();
    var parsedToken = jwtHelper.decodeToken(this.loginService.token);
    let id = parsedToken.id;
    localStorage.setItem('user_id',id);
    // console.log('login id' + localStorage.user_id);
// console.log('id '+localStorage.user_id);

  }

  getNotificaiton() {
    this.read = 0;
    this.notificaitonservice.getNotification()
      .subscribe((result) => {
        for (let i = 0; i < result.length; i++) {

          if (result[i].read == false) {
            this.notification = result;
            this.read = this.read + 1;
          }
        }
        // console.log(result);
      });
  }
  view(event_id, _id) {
    console.log(event_id);

    this.getNotificaiton();
    let event = event_id.split('_');
    this.id = event[1];
    // console.log('yd' + event[0]);
    let id = _id;
    let notification = {
      read: true
    }
   
    switch (event[0]) {
      case 'br':
        this.notificaitonservice.getNotificationById(id)
          .subscribe((data) => {

            this.notificaitonservice.editNotification(id, notification)
              .subscribe((res) => {
                this.router.navigate(['brand/']);
                this.getNotificaiton();
                console.log(res);
              });
            // console.log(data);
          });
        break;

      case 'ca':
        this.notificaitonservice.getNotificationById(id)
          .subscribe((data) => {
            this.notificaitonservice.editNotification(id, notification)
              .subscribe((res) => {
                this.router.navigate(['category/']);
                this.getNotificaiton();
                console.log(res);
              });
            // console.log(data);
          });
        break;
      case 'or':
        this.notificaitonservice.getNotificationById(id)
          .subscribe((data) => {
            this.notificaitonservice.editNotification(id, notification)
              .subscribe((res) => {
                this.router.navigate(['vieworder/', id]);
                this.getNotificaiton();
                console.log(res);
              });
            // console.log(data);
          });

        break;

      case 'pr':
        this.notificaitonservice.getNotificationById(id)
          .subscribe((data) => {
            this.notificaitonservice.editNotification(id, notification)
              .subscribe((res) => {
                this.router.navigate(['viewproduct/', id]);

                this.getNotificaiton();
                console.log(res);
              });
            // console.log(data);
          });
        break;
      case 'de':
        this.notificaitonservice.getNotificationById(id)
          .subscribe((data) => {
            this.notificaitonservice.editNotification(id, notification)
              .subscribe((res) => {
                this.router.navigate(['dealer/']);
                this.getNotificaiton();
                console.log(res);
              });
            // console.log(data);
          });

        break;
      default:
        break;
    }
  }

  getuser(user_id) {
    let id = localStorage.user_id;
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
        this.loginService.logout()
      .subscribe(() => {
        localStorage.clear();
        // console.log(localStorage.user_id);
        if (this.loginService.token === null) {
        }
        this.router.navigate(["/login"]);
     
      });

  }


}
