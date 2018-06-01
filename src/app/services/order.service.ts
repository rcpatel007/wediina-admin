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

// all order

  getOrder() {
    let headers = new Headers();    
        headers = new Headers({'x-access-token':'' +this.loginService.token});
      let options = new RequestOptions({ headers: headers });
 
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/order', options)
      .pipe(map(res => res.json()));
      
  }

  // single order get

  viewOrder(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/order/'+id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }

  // update order

  updateOrder(updateOrder, id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.put('https://jasmatech-backend-api.herokuapp.com/order/'+id ,updateOrder,{headers: headers})
      .pipe(map( res => res.json()));
  
  }


  // dealer data get

  getAccountById(id) {
    //  headers = new Headers();    
     let headers = new Headers({'x-access-token': ''+ this.loginService.token});
      return this.http.get('https://jasmatech-backend-api.herokuapp.com/account/' +id,{headers: headers})
      .pipe(map( res => res.json()));
  
  }
 
// delete order

  deleteOrder(id) {
    let headers = new Headers({'x-access-token': ''+ this.loginService.token});
  
    return this.http.delete('https://jasmatech-backend-api.herokuapp.com/order/'+id, {headers: headers})
    .pipe(map( res => res.json()));
  
  }
  

}
