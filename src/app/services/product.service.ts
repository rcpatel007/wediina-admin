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

  // get Product by id

  getProductById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/prod/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add product

  addProdcut(product) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/prod/',product, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editProduct(id, updateproduct) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/prod/'+id, updateproduct,{headers : headers})
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteProduct(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.delete('https://jasmatech-backend-api.herokuapp.com/prod/'+id, {headers: headers})
  .pipe(map( res => res.json()));

 }

 imgurImage(base64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  return this.http.post('https://api.imgur.com/3/image',base64, {headers: headers})
  .pipe(map( res => res.json()));
   

}

imgurotherImage(otherbase64){
  let headers = new Headers({'Authorization': 'Client-ID e22c18840a29adc'});
  headers.append('Accept', 'application/json');
  // headers.append('authorization', 'e22c18840a29adc');
  return this.http.post('https://api.imgur.com/3/image',otherbase64, {headers: headers})
  .pipe(map( res => res.json()));

}


}
