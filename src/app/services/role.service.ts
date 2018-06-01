import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: Http, private loginService:LoginService) { }

  // all role
  getRole() {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/role',{headers: headers})
     .pipe(map( res => res.json()));
 
 }

 // get role by id

 getRoleById(id) {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/role/' +id,{headers: headers})
     .pipe(map( res => res.json()));
 
 }

 // add role

 addRole(role) {    
   let headers = new Headers({'x-access-token': ''+ this.loginService.token});
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/role/',role, {headers: headers})
     .pipe(map( res => res.json()));
 
 }
 
 // edit role

 editRole(id, updaterole) {
 let headers = new Headers({'x-access-token': ''+ this.loginService.token});
 return this.http.put('https://jasmatech-backend-api.herokuapp.com/role/'+id, updaterole, {headers : headers})
 .pipe(map( res => res.json()));

}

// delete role

 deleteRole(id) {
 let headers = new Headers({'x-access-token': ''+ this.loginService.token});

 return this.http.put('https://jasmatech-backend-api.herokuapp.com/role/'+id, {headers: headers})
 .pipe(map( res => res.json()));

}

}
