import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginService } from './services/login.service';

import { Globals } from 'globals';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  id: String;
  constructor(private loginservice: LoginService) {

    this.id = environment.user_id;

  }




}
