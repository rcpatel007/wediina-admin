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
      return this.http.get(environment.api_url + '/prod',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Product by id

  getProductById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get(environment.api_url + '/prod/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add product

  addProdcut(product) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post(environment.api_url + '/prod/',product, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit product

  editProduct(id, updateproduct) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put(environment.api_url + '/prod/'+id, updateproduct,{headers : headers})
  .pipe(map( res => res.json()));

}

// delete prodcut
 
  deleteProduct(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.delete(environment.api_url + '/prod/'+id, {headers: headers})
  .pipe(map( res => res.json()));

 }

//  imgur API

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

 /* get img by id */
 editimg(updateimg) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});   
  return this.http.put(environment.api_url + '/prod_update_image/'+updateimg._id, updateimg, {headers: headers})
  .pipe(map( res => res.json()));


}
 /* get other img by id */
 othereditimg(otherupdateimg) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});   
  return this.http.put(environment.api_url + '/prod_update_other_images/'+otherupdateimg._id, otherupdateimg, {headers: headers})
  .pipe(map( res => res.json()));


}


}
