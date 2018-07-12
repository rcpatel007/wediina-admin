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
    return this.http.get(environment.api_url + '/cart/' + user_id, { headers: headers })
      .pipe(map(res => res.json()));

  }


  getCartAll() {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get(environment.api_url + '/cart/', { headers: headers })
      .pipe(map(res => res.json()));

  }

  // add cart
  addcart(tempcart) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post(environment.api_url + '/cart/', tempcart, { headers: headers })
      .pipe(map(res => res.json()));
  }
  // edit temp cart
  editcart(uid, tempcart) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put(environment.api_url + '/cart/' + uid, tempcart, { headers: headers })
      .pipe(map(res => res.json()));
  }
  deletecart(id) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.delete(environment.api_url + '/cart/' + id, { headers: headers })
      .pipe(map(res => res.json()));

  }

  // order
  addOrder(order) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post(environment.api_url + '/order/', order, { headers: headers })
      .pipe(map(res => res.json()));
  }
  addGuest(guest) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post(environment.api_url + '/guest/', guest, { headers: headers })
      .pipe(map(res => res.json()));
  }

}
