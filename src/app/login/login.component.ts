import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
// import { Globals } from '../../globals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, Response, Request, RequestMethod } from '@angular/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String =null;
  pwd: String =null;
  x_access_token: String;
  msg: String = null;

  constructor(private loginService: LoginService, private router: Router, fb: FormBuilder) { }

  ngOnInit() {
    if (this.loginService.token != null){
      this.router.navigate(["/dashboard"]);
      }

  }

  userLogin() {
    // this.globals.email = this.email;
    if (this.email == null || this.pwd == null)  {

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
            this.msg = "Email or Password  not Match";
            console.log(error);

          }
        );
    }
  }
}