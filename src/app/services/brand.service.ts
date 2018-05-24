import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';



@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: Http, private loginService:LoginService) { }

  // all Brand
  getBrand() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/brand',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Dealer by id

  getBrandById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/brand/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer

  addBrand(addbrand) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/brand',addbrand, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit barnad

  editBrand(brand) {
  let headers = new Headers({'x-access-token':''+ this.loginService.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/brand/'+brand._id, brand,{headers: headers})
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteBrand(id) {
  let headers = new Headers({'x-access-token':''+ this.loginService.token});
  return this.http.delete('https://jasmatech-backend-api.herokuapp.com/brand/'+id, {headers: headers})
  .pipe(map( res => res.json()));

}



}


