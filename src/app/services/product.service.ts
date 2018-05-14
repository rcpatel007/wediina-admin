import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginService } from '../../app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: Http, private loginService:LoginService) { }
 
  // all Dealer
  getProduct() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/prod',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Dealer by id

  getProductById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/prod/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer

  addProdcut(product) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/prod',product, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editProduct(id, updateproduct) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/prod/'+id, updateproduct,{headers : headers})
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteProduct(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/prod/',+id, {headers: headers})
  .pipe(map( res => res.json()));

 }

}
