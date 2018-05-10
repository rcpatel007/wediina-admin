import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  constructor(private http: Http) { }

  // all category
  getGuest() {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/guest',{headers: headers})
     .pipe(map( res => res.json()));
 
 }

 // get Category by id

 getGuestById(id) {
   //  headers = new Headers();    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.get('https://jasmatech-backend-api.herokuapp.com/guest' +id,{headers: headers})
     .pipe(map( res => res.json()));
 
 }

 // add Dealer

 addGuest(guest) {    
   let headers = new Headers({'x-access-token': ''+ environment.token});
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/guest',guest, {headers: headers})
     .pipe(map( res => res.json()));
 
 }
 
 // edit user

 editGuest(id, updateguest) {
 let headers = new Headers({'x-access-token': ''+ environment.token});
 return this.http.put('https://jasmatech-backend-api.herokuapp.com/guest',+id, updateguest)
 .pipe(map( res => res.json()));

}

// delete user

 deleteGuest(id) {
 let headers = new Headers({'x-access-token': ''+ environment.token});

 return this.http.put('https://jasmatech-backend-api.herokuapp.com/guest',+id, {headers: headers})
 .pipe(map( res => res.json()));

}
}
