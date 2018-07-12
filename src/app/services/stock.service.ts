import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LoginService } from '../../app/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: Http, private loginService: LoginService) { }

  // all stock get

  getStock() {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get(environment.api_url + '/stock', { headers: headers })
      .pipe(map(res => res.json()));

  }


  // id wise stock get

  getStockById(product_id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get(environment.api_url + '/stock/' + product_id, { headers: headers })
      .pipe(map(res => res.json()));

  }


  // add stock
  addStock(stock) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post(environment.api_url + '/stock/', stock, { headers: headers })
      .pipe(map(res => res.json()));

  }
  // edit stock
  editStock(product_id, stock) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put(environment.api_url + '/stock_qty/' + product_id, stock, { headers: headers })
      .pipe(map(res => res.json()));
  }
  // order edit stock update

  orderStockUpdate(product) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put(environment.api_url + '/update_stock', product, { headers: headers })
      .pipe(map(res => res.json()));
  }

}
