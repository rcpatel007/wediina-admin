import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
// import { Globals } from '../../globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Request, RequestMethod } from '@angular/http';

declare var $:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String = null;
  pwd: String = null;
  x_access_token: String;
  msg: String = null;

  constructor(private loginService: LoginService, private router: Router, fb: FormBuilder) { }

  ngOnInit() {
    if (localStorage.user_id != null) {
      this.router.navigate(["/dashboard"]);
    }

    
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

  userLogin() { 
    // this.globals.email = this.email;
    if (this.email == null || this.pwd == null) {
      this.msg = null;
      this.msg = "please enter email or password";
    }

    else {
      let user = {
        email: this.email,
        password: this.pwd,
      }


      this.loginService.userLogin(user)
        .subscribe((result) => {
          if (result == true) {
            this.router.navigate(["/dashboard"]);
            console.log('' + result);
          }
          else {
            this.router.navigate(["/login"]);
            console.log('false ' + result);

          }
        },
          (error) => {
            this.msg = null;
            this.msg = error._body;
            console.log(error);

          }
        );
    }
  }
}