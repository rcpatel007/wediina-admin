import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private http: Http) { }
 
  // all Dealer
  getDealerType() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/dealer_type',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Dealer by id

  getDealerTypeById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/dealer_type' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer

  addDealerType(dealer) {    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/dealer_type',dealer, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editDealerType(id, updatedealer) {
  let headers = new Headers({'x-access-token': ''+ environment.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/dealer_type',+id, updatedealer)
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteDealerType(id) {
  let headers = new Headers({'x-access-token': ''+ environment.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/dealer_type',+id, {headers: headers})
  .pipe(map( res => res.json()));

}






}
