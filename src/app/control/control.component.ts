import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (environment.token===null){
      this.router.navigate(["/login"]);
      

    }
  }
}
