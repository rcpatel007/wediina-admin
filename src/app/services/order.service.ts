import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: Http) { }

  getOrder(auth) {
    let headers = new Headers();    
    //  let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.post('https://jasmatech-backend-api.herokuapp.com/get_order', auth, {headers: headers})
      .pipe(map( res => res.json()));
  
  }
  viewOrder(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ environment.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/order'+id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }


}
