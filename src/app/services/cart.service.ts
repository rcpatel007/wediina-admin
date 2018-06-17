import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginService } from '../../app/services/login.service';

@Injectable()
export class CartService {

  constructor(private http: Http,
    private loginService: LoginService) { }


  getCart(user_id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get('https://jasmatech-backend-api.herokuapp.com/cart/'+user_id,{ headers: headers })
      .pipe(map(res => res.json()));

  }


  getCartId(id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get('https://jasmatech-backend-api.herokuapp.com/cart/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // add cart
  addcart(tempcart) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/cart/', tempcart, { headers: headers })
      .pipe(map(res => res.json()));
  }
  // edit temp cart
  editcart(uid, tempcart) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put('https://jasmatech-backend-api.herokuapp.com/cart/' + uid, tempcart, { headers: headers })
      .pipe(map(res => res.json()));
  }
  deletecart(id) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.delete('https://jasmatech-backend-api.herokuapp.com/cart/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // order
  addOrder(order) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/order/', order, { headers: headers })
      .pipe(map(res => res.json()));
  }
  addGuest(guest) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/guest/',guest, { headers: headers })
      .pipe(map(res => res.json()));
  }

}
