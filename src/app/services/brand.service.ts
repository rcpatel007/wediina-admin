import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: Http) { }

  // all Brand
  getBrand() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/brand',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Dealer by id

  getBrandById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/brand' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer

  addBrand(dealer) {    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/brand',dealer, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editBrand(id, brand) {
  let headers = new Headers({'x-access-token': ''+ environment.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/brand',+id, brand)
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteBrand(id) {
  let headers = new Headers({'x-access-token': ''+ environment.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/brand',+id, {headers: headers})
  .pipe(map( res => res.json()));

}



}


