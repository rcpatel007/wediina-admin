import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {ViewChild, ElementRef} from '@angular/core';
import { Guest } from '../model/guest'
import { GuestService } from '../services/guest.service';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
auth:any;
guest  : Guest[];

  constructor(private router: Router,
    private loginservice:LoginService,
     private guestsrervice: GuestService,
    private globals: Globals) { }

  ngOnInit() {
    if (this.loginservice.token === null){
      this.router.navigate(["/login"]);
      }
  
    this.auth = {"email": this.globals.email,"token": this.loginservice.token}

    this.viewguest();
  }


  viewguest(){
    this.guestsrervice.getGuest()
                    .subscribe((Guest) => {
                      //  console.log(account);
                      this.guest =  Guest;
                      console.log(this.guest);
                      
                    });
  }
  
}
