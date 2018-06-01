import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';



@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: Http, private loginService:LoginService) { }



  // all city
  getcity() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/city',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add city

  addcity(cities) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.put('https://jasmatech-backend-api.herokuapp.com/city/',cities, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  

// delete city
 
  deleteCity(id) {
  let headers = new Headers({'x-access-token':''+ this.loginService.token});
  return this.http.delete('https://jasmatech-backend-api.herokuapp.com/city/'+id, {headers: headers})
  .pipe(map( res => res.json()));

}



}
