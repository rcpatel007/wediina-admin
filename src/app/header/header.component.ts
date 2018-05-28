import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import * as io from 'socket.io-client';
import { Token } from '@angular/compiler';
import { UserService } from '../services/user.service';
import { User } from '../model/User';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  socket;
  msg = new Array();
  name: String;
  user_id:String;
  email: String;

  constructor(private router: Router,
    private userservice: UserService,
    private loginService: LoginService
  ) { this.socket = io('https://jasmatech-backend-api.herokuapp.com'); }

  ngOnInit() {
    if (this.loginService.token === null) {
      this.router.navigate(["/login"]);
    }

    //  this.socket.on('hello', (data) => console.log(data));
    this.socket.on('new-brand', (result) => {
      // this.display = true;
      this.msg.push("New Brand Added: " + result.data.name);

    });
    this.getuser(this.user_id);

  }


  getuser(user_id) {
    let id = environment.user_id

    this.userservice.getUserById(id)
      .subscribe((data) => {
        //  console.log(account);
        this.name = data.name;
        this.email = data.email;
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
