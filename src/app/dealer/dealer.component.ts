import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {

  
  constructor(private router: Router) { }


  ngOnInit() {
    if (environment.token===null){
      this.router.navigate(["/login"]);
      

  }

}
}
