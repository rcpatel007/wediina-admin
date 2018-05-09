import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }

  userLogin(user) {
    
    let headers = new Headers();
      return this.http.post('https://jasmatech-backend-api.herokuapp.com/validate_user_login',user, {headers: headers})
      .pipe(map( res => res.json()));
  
  }

}
