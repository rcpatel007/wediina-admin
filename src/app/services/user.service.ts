import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

  // all user

  getUser() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/user',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get user by id

  getUserById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/user' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add user

  addUser(user) {    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/user',user, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editUser(id, updateuser) {
  let headers = new Headers({'x-access-token': ''+ environment.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/user',+id, updateuser)
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteUser(id) {
  let headers = new Headers({'x-access-token': ''+ environment.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/user',+id, {headers: headers})
  .pipe(map( res => res.json()));

}





}
