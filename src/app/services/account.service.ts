import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginService } from './login.service';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: Http,
              private loginservice:LoginService) { }

  // all category
  getAccount() {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ this.loginservice.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/account',{headers: headers})
     .pipe(map( res => res.json()));
 
 }
 // get account by id

 getAccountById(id) {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ this.loginservice.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/account/' +id,{headers: headers})
     .pipe(map( res => res.json()));
 
 }

 // add Dealer

 addAccount(account) {    
   let headers = new Headers({'x-access-token': ''+ this.loginservice.token});
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/account/',account, {headers: headers})
     .pipe(map( res => res.json()));
 
 }
 
 // edit user

 editRole(id, updateaccount) {
 let headers = new Headers({'x-access-token': ''+ this.loginservice.token});
 return this.http.put('https://jasmatech-backend-api.herokuapp.com/account/'+id, updateaccount, {headers : headers})
 .pipe(map( res => res.json()));

}

// delete user

 deleteAccount(id) {
 let headers = new Headers({'x-access-token': ''+ this.loginservice.token});

 return this.http.put('https://jasmatech-backend-api.herokuapp.com/account/',+id, {headers: headers})
 .pipe(map( res => res.json()));

}


}
