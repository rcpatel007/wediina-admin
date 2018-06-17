import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
declare var $: any;


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  email: String;

  constructor(private userservice: UserService, private loginservice: LoginService) { }

  ngOnInit() {


    $("script[src='ass++++++++++++++++++++++ets/css/themes/collapsible-menu/materialize.css']").remove();
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


  sendMail() {
    let mail = this.email;

    this.userservice.getUser()
      .subscribe((User) => {
        for (let index = 0; index < User.length; index++) {
          if (this.email === User[index].email) {
            let mail = this.email;
            break;
          }


        }

        if (mail !== null) {
          this.loginservice.sendMail(mail)
            .subscribe((res) => {
                console.log(res);
                
            },
              (error) => {

                let msg = error._body;
              });

        }


      });

  }

}
