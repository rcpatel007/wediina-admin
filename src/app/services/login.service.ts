import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';



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
  
  logout() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/logout',{headers: headers})
      .pipe(map( res => res.json()));
  
  }


}
