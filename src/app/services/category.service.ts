import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';
import { LoginService } from '../../app/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http, private loginService:LoginService) { }

   // all category
   getCategory() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token':''+ this.loginService.token});
      return this.http.get(environment.api_url + '/cat',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Category by id

  getCategoryById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token':''+ this.loginService.token});
      return this.http.get(environment.api_url + '/cat/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add category

  addCategory(Category) {    
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
     return this.http.post(environment.api_url + '/cat',Category, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editCategory(cat) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  return this.http.put(environment.api_url + '/cat/'+cat._id, cat,{headers: headers})
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteCategory(id) {
  let headers = new Headers({'x-access-token': ''+ this.loginService.token});

  return this.http.delete(environment.api_url + '/cat/'+id, {headers: headers})
  .pipe(map( res => res.json()));

}

}
