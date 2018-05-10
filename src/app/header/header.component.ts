import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if (environment.token===null){
      this.router.navigate(["/login"]);
      

    }
  }
  
  logout() {
    this.loginService.logout()
                    .subscribe(() => {
                      this.router.navigate(["/login"]);
                    });
                    
  }
  

}
