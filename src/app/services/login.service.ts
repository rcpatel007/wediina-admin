import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token: string;
  // public  email:String;

  constructor(private http: Http) {  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  this.token = currentUser && currentUser.token;}
  // this.email = currentUser && currentUser.email; 

  userLogin(user) { 

    let headers = new Headers();
      return this.http.post('https://jasmatech-backend-api.herokuapp.com/validate_user_login',user, {headers: headers})
           .pipe(map((response: Response) => {

          // login successful if there's a jwt token in the response
           let token = response.json() && response.json().token;
          if (token) {
            // set token property
            this.token = token;
            // this.email = email;

            // store username and jwt token in local storage to keep user logged in between page refreshes
           localStorage.setItem('currentUser', JSON.stringify({ token: token }));
        
            // return true to indicate successful login
            return true;
        } else {
            // return false to indicate failed login
            return false;
        }
          
          }));
 
  }
  
  logout() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/logout',{headers: headers})
      .pipe(map( res => res.json()));
  
  }


}
