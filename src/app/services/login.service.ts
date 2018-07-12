import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token: string;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }
  // this.email = currentUser && currentUser.email; 

  userLogin(user) {
    let headers = new Headers();
    return this.http.post(environment.api_url + '/validate_user_login', user, { headers: headers })
      .pipe(map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        let email = response.json() && response.json().email;
        if (token) {
          // set token property
          this.token = token;
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


  // forgot password
  validatepwd(validate_pwd) {
    //  headers = new Headers();  
    let headers = new Headers({ 'x-access-token': '' + localStorage.token });
    return this.http.put(environment.api_url + '/validate_current_password',validate_pwd, { headers: headers })
      .pipe(map(res => res.json()));
  }

  checkMail() {
    //  headers = new Headers();    
    return this.http.get(environment.api_url + '/user_emails')
      .pipe(map(res => res.json()));
  }

  sendMail(id,send_email) {
    //  headers = new Headers();    
    return this.http.put(environment.api_url + '/forgot_user_password/'+ id ,send_email)
      .pipe(map((response: Response) => { }));
  }

  // logout
  logout() {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + localStorage.token });
    return this.http.get(environment.api_url + '/logout', { headers: headers })
      .pipe(map((response: Response) => {
        this.token = null;

        // store username and jwt token in local storage to keep user logged in between page refreshes
      }));
  }


}