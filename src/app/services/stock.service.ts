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
    return this.http.get('https://jasmatech-backend-api.herokuapp.com/stock', { headers: headers })
      .pipe(map(res => res.json()));

  }


  // id wise stock get

  getStockById(product_id) {
    //  headers = new Headers();    
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.get('https://jasmatech-backend-api.herokuapp.com/stock/' + product_id, { headers: headers })
      .pipe(map(res => res.json()));

  }


  // add stock
  addStock(stock) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.post('https://jasmatech-backend-api.herokuapp.com/stock/', stock, { headers: headers })
      .pipe(map(res => res.json()));

  }
  // edit stock
  editStock(product_id, stock) {
    let headers = new Headers({ 'x-access-token': '' + this.loginService.token });
    return this.http.put('https://jasmatech-backend-api.herokuapp.com/stock_qty/' + product_id, stock, { headers: headers })
      .pipe(map(res => res.json()));

  }

}
