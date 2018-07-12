import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  constructor(private http: Http, private loginService:LoginService) { }

  // all guest
  getGuest() {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.get(environment.api_url + '/guest',{headers: headers})
     .pipe(map( res => res.json()));
 
 }
 
}
