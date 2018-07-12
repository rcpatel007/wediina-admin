import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class DealertypeService {

  constructor(private http: Http, private loginService:LoginService) { }


  // all category
  getType() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get(environment.api_url + '/dealer_type',{headers: headers})
      .pipe(map( res => res.json()));
  
  }
 
  getTypeById(id)  {
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
    return this.http.get(environment.api_url + '/dealer_type/'+id, {headers : headers})
    .pipe(map( res => res.json()));
   
   }
   
 
  // add Dealer
 
  addType(role) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post(environment.api_url + '/dealer_type',role, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user
 
  editType(id, updatetype) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put(environment.api_url + '/dealer_type/'+id, updatetype, {headers : headers})
  .pipe(map( res => res.json()));
 
 }
 
 // delete user
 
  deleteType(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
 
  return this.http.put(environment.api_url + '/dealer_type/'+id, {headers: headers})
  .pipe(map( res => res.json()));
 
 }
}
