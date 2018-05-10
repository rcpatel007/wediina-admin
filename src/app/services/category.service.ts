import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';
import { Http, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

   // all category
   getCategory() {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/cat',{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // get Category by id

  getCategoryById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/cat' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // add Dealer

  addCategory(Category) {    
    let headers = new Headers({'x-access-token': ''+ environment.token});
     return this.http.post('https://jasmatech-backend-api.herokuapp.com/cat',Category, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  
  // edit user

  editCategory(id, updatecategory) {
  let headers = new Headers({'x-access-token': ''+ environment.token});
  return this.http.put('https://jasmatech-backend-api.herokuapp.com/cat',+id, updatecategory)
  .pipe(map( res => res.json()));

}

// delete user
 
  deleteCategory(id) {
  let headers = new Headers({'x-access-token': ''+ environment.token});

  return this.http.put('https://jasmatech-backend-api.herokuapp.com/cat',+id, {headers: headers})
  .pipe(map( res => res.json()));

}

}
