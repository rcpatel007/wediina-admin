import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginService } from './services/login.service';
import {JwtHelper} from './Jwthelper';

import { Globals } from 'globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 title = 'app';

 constructor(private loginservice:LoginService){

  this.userRole();
 }


 

userRole() {
  var jwtHelper = new JwtHelper();
  var parsedToken = jwtHelper.decodeToken(this.loginservice.token);
  environment.user_id = parsedToken.id;  

}

}
