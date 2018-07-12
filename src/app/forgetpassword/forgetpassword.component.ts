import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  email: String;
  id: String;
  mail: String;
  msg: String;
  constructor(private userservice: UserService, private loginservice: LoginService, private route: ActivatedRoute,
    private router: Router
  ) { }

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
    this.loginservice.checkMail()
      .subscribe((usermail) => {
        console.log(usermail);
        for (let index = 0; index < usermail.length; index++) {
          if (this.email === usermail[index].email) {
            this.mail = usermail[index].email;
            this.id = usermail[index]._id;
            // this.id = User[index]._id;
            break;
          }
        }
        let send_email = {
          email: this.email
        }
        this.loginservice.sendMail(this.id, send_email)
          .subscribe((res) => {
            console.log(res);
            this.router.navigate(['login']);

          },
            (error) => {
              this.msg = "We couldn't find any account associated with this Email ";
              console.log(this.msg);

            });
      });
  }
}
