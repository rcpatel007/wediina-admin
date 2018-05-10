import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as myGlobals from '../../globals';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  pwd: any;
  x_access_token: String;
  
    constructor(private LoginService:LoginService,private router: Router) { }

  ngOnInit() {
    
}

userLogin(){

let user={

  email: this.email,
  password: this.pwd

}
    this.LoginService.userLogin(user)
                    .subscribe((result) => {
                      console.log(result);
                      if (result.auth==true){
                        // environment.token = result.token;
                        // environment.email = this.email;
                        // environment.refresh_token = result.refreshToken;
                        myGlobals.token = result.token;
                        myGlobals.email = this.email;
                        myGlobals.refresh_token = result.refreshToken;
                        console.log(environment);
                        
                        this.router.navigate(["/dashboard"]);
                      
                      }
                      else{
                        this.router.navigate(["/login"]);
                      }
                    });
   
}
}
