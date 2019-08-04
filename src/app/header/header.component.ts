import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { JwtHelper } from '../JwtHelper';
import * as io from 'socket.io-client';
import { Token } from '@angular/compiler';
import { Notification } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id: String;
  msg = new Array();
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

  constructor(private router: Router,
    private loginService: LoginService,
  ) {  }

  ngOnInit() {

    
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


  // profile password change
 
}
