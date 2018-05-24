import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions, Response  } from '@angular/http';
import { environment } from '../../environments/environment';
import { LoginService } from '../../app/services/login.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: Http, private loginService:LoginService) { }

  getOrder() {
    let headers = new Headers();    
        headers = new Headers({'x-access-token':'' +this.loginService.token});
      let options = new RequestOptions({ headers: headers });
 
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/order', options)
      .pipe(map(res => res.json()));
      
  }
  viewOrder(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/order/'+id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }
  updateOrder(updateOrder) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.put('https://jasmatech-backend-api.herokuapp.com/order/'+updateOrder._id ,updateOrder,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  getAccountById(user_id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/account/' +user_id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }
 

  deleteOrder(id) {
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  
    return this.http.delete('https://jasmatech-backend-api.herokuapp.com/order/'+id, {headers: headers})
    .pipe(map( res => res.json()));
  
  }
  

}
