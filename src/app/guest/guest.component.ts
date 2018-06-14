import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { Guest } from '../model/guest'
import { GuestService } from '../services/guest.service';
import { LoginService } from '../services/login.service';
import { Globals } from '../../globals';


declare var $: any;
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  auth: any;
  guest: Guest[];

  constructor(private router: Router,
    private loginservice: LoginService,
    private guestsrervice: GuestService,
    private globals: Globals) { }

  ngOnInit() {
    if (this.loginservice.token === null) {
      this.router.navigate(["/login"]);
    }

    this.auth = { "email": this.globals.email, "token": this.loginservice.token }

    this.viewguest();

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


  viewguest() {
    this.guestsrervice.getGuest()
      .subscribe((Guest) => {
        //  console.log(account);
        this.guest = Guest;
        console.log(this.guest);

      });
  }

}
