import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import  * as io from 'socket.io-client';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  socket;
  msg = new Array();

  constructor(private router: Router, private loginService: LoginService) {this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }

  ngOnInit() {
    if (this.loginService.token===null){
      this.router.navigate(["/login"]);
    }

    //  this.socket.on('hello', (data) => console.log(data));
    this.socket.on('new-brand', (result) => {
        // this.display = true;
        this.msg.push("New Brand Added: " + result.data.name);

      });
  
  }
  
  logout() {
    localStorage.removeItem("token");
    this.loginService.logout()
                    .subscribe(() => {
                        
                      this.router.navigate(["/login"]);
                    });
                    
  }
  

}
