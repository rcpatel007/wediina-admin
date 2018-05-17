import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private loginService:LoginService) { }

  // all user

  getUser() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/user/',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get user by id

  getUserById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/user/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add user

  addUser(add_user) {  
    let headers = new Headers();  
        headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/create_user/',add_user, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  updateUser(id, updateuser) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/update_user/'+id, updateuser, {headers : headers})
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteUser(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/user/'+id, {headers: headers})
  .pipe(map( res => res.json()));

}





}