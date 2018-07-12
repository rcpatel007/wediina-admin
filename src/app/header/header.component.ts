import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelper } from '../JwtHelper';
import * as io from 'socket.io-client';
import { Token } from '@angular/compiler';
import { UserService } from '../services/user.service';
import { User } from '../model/User';
import { NotificationService } from '../services/notification.service';
import { Notification } from 'rxjs';
import { Notificaiton } from '../model/notification';
declare var $: any;

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
  mobile: String;
  read: any;
  n_id: String;
  cpwd: String;
  npwd: String;
  confirmpwd: String;
  pwderror: String;
  pwdsucess: String;
  // user
  role: String;
  o_view: boolean;
  d_view: boolean;
  i_view: boolean;
  b_view: boolean;
  c_view: boolean;
  counter: boolean = false;

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
      this.read = this.read + 1;
    });
    this.getNotificaiton();
    this.getuser(this.user_id);

    $("script[src='assets/css/themes/collapsible-menu/materialize.css']").remove();
    $("script[src='assets/vendors/perfect-scrollbar/perfect-scrollbar.css']").remove();
    $("script[src='assets/js/materialize.min.js']").remove();
    $("script[src='assets/js/scripts/advanced-ui-modals.js']").remove();
    $("script[src='assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js']").remove();



    var dynamicScripts = [
      "assets/css/themes/collapsible-menu/materialize.css",
      "assets/js/materialize.min.js",
      "assets/js/scripts/advanced-ui-modals.js",
      "assets/vendors/perfect-scrollbar/perfect-scrollbar.min.js",
      "assets/vendors/perfect-scrollbar/perfect-scrollbar.css"
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
    localStorage.setItem('user_id', id);
    // console.log('login id' + localStorage.user_id);
    // console.log('id '+localStorage.user_id);
    this.id = localStorage.user_id;

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
        console.log(data);
        this.name = data.name;
        this.email = data.email;
        this.mobile = data.mobile;
        this.o_view = data.order.view;
        this.i_view = data.product.view;
        this.d_view = data.dealer.view;
        this.b_view = data.brand.view;
        this.c_view = data.category.view;
        this.role = data.role;
        // console.log(this.role);
      });
  }
  // update user
  editProfile(id) {
    let update = {
      name: this.name,
      email: this.email,
      mobile: this.mobile
    }
    console.log(update);

    this.userservice.updateProfile(id, update)
      .subscribe((res) => {

      });
  }

  logout() {
    this.loginService.logout()
      .subscribe(() => {
        localStorage.clear();
        // console.log(localStorage.user_id);
        if (this.loginService.token === null) {

          this.router.navigate(["/login"]);
        }
      });

  }

  view_notification() {
    if (this.counter == false) {
      document.getElementById('notifications-dropdown').style.display = "block";
      this.counter = true;
    } else {
      document.getElementById('notifications-dropdown').style.display = "none";
      this.counter = false;
    }

  }

  // profile password change

changePassword() {
    let id = localStorage.user_id;
    let validate_pwd = {
      id: localStorage.user_id,
      password: this.cpwd
    }
    console.log(validate_pwd);

    this.loginService.validatepwd(validate_pwd)
      .subscribe((res) => {
        console.log(res);

        if (res.auth == true) {
          // console.log(this.npwd);
          // console.log(this.confirmpwd);
          if (this.npwd == this.confirmpwd) {
            let pwd = {
              password: this.npwd
            }
            this.userservice.changePassword(id, pwd)
              .subscribe(() => {
                this.pwderror = null;
                this.pwdsucess = "password Update Sucessfully"
                // console.log(this.pwdsucess);

              });
          }
          else {
            this.pwdsucess = null;
            this.pwderror = "New Password & Confirm password not match";
            // console.log(this.pwderror);
          }
        }
      },
        (error) => {

          this.pwdsucess = null;
          this.pwderror = "Current Password is Wrong";
          // console.log(error._body);
        }
      );
  }
}
