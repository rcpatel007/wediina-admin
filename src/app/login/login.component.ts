import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Globals } from '../../globals';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  pwd: String;
  x_access_token: String;
  
    constructor(private LoginService:LoginService,private router: Router, private globals: Globals) { }

  ngOnInit() {
    
}

userLogin(){
// this.globals.email = this.email;
let user={

  email: this.email,
  password: this.pwd,
 
}
    this.LoginService.userLogin(user)
                    .subscribe((result) => {
                      if (result == true){
                        this.router.navigate(["/dashboard"]);
                        console.log(result);
                        
                      }
                      else{
                        this.router.navigate(["/login"]);
                      }
                    });
   
}
}
