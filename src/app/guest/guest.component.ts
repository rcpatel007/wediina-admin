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
  term:String;

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

  printContent(id){
  
    let  str=document.getElementById(id).innerHTML
      let newwin=window.open('','printwin','left=10,top=10,width=1000,height=800')
      newwin.document.write('<HTML>\n<HEAD>\n')
      newwin.document.write('<TITLE> JasmaTech</TITLE>\n')
      newwin.document.write('<script>\n')
      newwin.document.write('function chkstate(){\n')
      newwin.document.write('if(document.readyState=="complete"){\n')
      newwin.document.write('window.close()\n')
      newwin.document.write('}\n')
      newwin.document.write('else{\n')
      newwin.document.write('setTimeout("chkstate()",2000)\n')
      newwin.document.write('}\n')
      newwin.document.write('}\n')
      newwin.document.write('function print_win(){\n')
      newwin.document.write('window.print();\n')
      newwin.document.write('chkstate();\n')
      newwin.document.write('}\n')
      newwin.document.write('<\/script>\n')
      newwin.document.write('</HEAD>\n')
      newwin.document.write('<BODY onload="print_win()"> <h4 style="text-align:center">Guest List </h4> \n\n')
      newwin.document.write(str)
      newwin.document.write('</BODY> \n')
      newwin.document.write('</HTML>\n')
      newwin.document.close()
      }
}
